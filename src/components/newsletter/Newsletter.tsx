import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import './newsletter.css';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  agree: z
    .boolean()
    .refine((val) => val === true, 'You must agree to the privacy policies'),
});

type FormData = z.infer<typeof schema>;

const setCookie = (name: string, value: string, days: number) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
};

const NewsletterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(
        'https://shopify-test-server.onrender.com/api/create-customer',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setSuccess('Successfully subscribed to the newsletter!');
        reset(); // Reset form fields
        setCookie('newsletter_subscribed', 'true', 1);
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        setError(result.message || 'Failed to create customer.');
      }
    } catch (error: any) {
      setError('Error creating customer: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    const element = document.getElementById('framework-snippet');
    if (element) {
      element.style.opacity = '0';
      element.style.transition = 'opacity 0.3s ease';
      setTimeout(() => {
        element.style.display = 'none';
        setCookie('newsletter_closed', 'true', 1);
      }, 300);
    }
  };

  return (
    <div className='newsletter-form__wrapper'>
      {/* Left section */}
      <div className='newsletter-form__left'>
        <button onClick={handleClose} className='close-button-mobile'>
          x
        </button>
        <img src='/assets/img.png' alt='img' />
      </div>
      {/* Right section */}
      <div className='newsletter-form__right'>
        <button onClick={handleClose} className='close-button-desktop'>
          x
        </button>
        <h2>10% Zľava na PRVÚ OBJEDNÁVKU</h2>
        <p>
          Chceš 10% zľavu na prvú objdenávku? Zadaj email a užívaj si krásne
          vlasy teraz ešte lacnejšie!
        </p>
        <form className='newsletter-form' onSubmit={handleSubmit(onSubmit)}>
          <div className='newsletter-input-field_wrapper'>
            <input
              type='text'
              placeholder='MENO'
              id='name'
              {...register('name')}
            />
            {errors.name && (
              <p style={{ color: 'red' }}>{errors.name.message}</p>
            )}
          </div>
          <div className='newsletter-input-field_wrapper'>
            <input
              type='email'
              placeholder='EMAILOVA ADRESA'
              id='email'
              {...register('email')}
            />
            {errors.email && (
              <p style={{ color: 'red' }}>{errors.email.message}</p>
            )}
          </div>
          <div className='checkbox-container'>
            <input type='checkbox' id='agree' {...register('agree')} />
            <label className='custom-checkbox-label' htmlFor='agree'>
              {' '}
              I agree to the User Agreement and{' '}
              <span className='check-box-newsletter-span'>Privacy Policy</span>
            </label>
            {errors.agree && (
              <p style={{ color: 'red' }}>{errors.agree.message}</p>
            )}
          </div>
          <button type='submit' disabled={isLoading}>
            {isLoading ? 'Prihlasujem...' : 'Prihlásiť sa'}
          </button>
        </form>
        {success && <p style={{ color: 'green' }}>{success}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default NewsletterForm;
