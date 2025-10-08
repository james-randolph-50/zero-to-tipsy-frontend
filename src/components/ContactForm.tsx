import { useForm, ValidationError } from '@formspree/react';

const ContactForm = () => {
  const [state, handleSubmit] = useForm("mdkwlwjy");
  if (state.succeeded) {
      return <p className="text-blue-500 text-center">Thanks for joining!</p>;
  }
  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 border border-gray-700 rounded-2xl shadow-md p-6 max-w-md mx-auto text-gray-300 space-y-5">
      <label htmlFor="email" className="block text-sm font-semibold text-blue-300 mb-2">
        Email Address
      </label>
      <input
        id="email"
        type="email" 
        name="email"
        className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
      />
      <ValidationError 
        prefix="Email" 
        field="email"
        errors={state.errors}
      />
    <label htmlFor="message" className="block text-sm font-semibold text-blue-300 mb-2">
        Message
      </label>
      <textarea
        id="message"
        name="message"
        className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition resize-none"
      />
      <ValidationError 
        prefix="Message" 
        field="message"
        errors={state.errors}
      />
      <button type="submit" disabled={state.submitting}  className="w-full bg-blue-500 hover:bg-blue-400 text-white font-semibold py-3 rounded-lg shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed">
        Submit
      </button>
    </form>
  );
};

export default ContactForm;