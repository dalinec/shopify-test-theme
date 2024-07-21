import React, { useState } from 'react';

// Define the type for form data
interface FormData {
  customer: {
    name: string;
    email: string;
  };
}

const NewsletterForm: React.FC = () => {
  // Initialize formData with proper type
  const [formData, setFormData] = useState<FormData>({
    customer: { name: '', email: '' },
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Handle input changes and update form data
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      customer: {
        ...prevState.customer,
        [id]: value,
      },
    }));
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    console.log(formData);

    try {
      const response = await fetch(
        'https://shopify-test-server.onrender.com/api/create-customer',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setSuccess('Customer created successfully!');
      } else {
        setError(result.message || 'Failed to create customer.');
      }
    } catch (error: any) {
      setError('Error creating customer: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Create Customer</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            id='name'
            value={formData.customer.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            value={formData.customer.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type='submit' disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Customer'}
        </button>
      </form>
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default NewsletterForm;
