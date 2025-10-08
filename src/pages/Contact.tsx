import ContactForm from "../components/ContactForm";

const Contact = () => {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h1 className="text-4xl font-bold text-blue-400 mb-4">Contact Us</h1>
        <p className="text-gray-900 text-lg mb-4">
          Questions, suggestions, or just want to say hi? Reach out to us!
        </p>
        <ContactForm />
      </div>
    );
  };
  
  export default Contact;
  
  