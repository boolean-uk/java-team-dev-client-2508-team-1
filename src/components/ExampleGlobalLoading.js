// Example usage of global loading in any component
import { useLoading } from '../context/loading';

const ExampleComponent = () => {
  const { showGlobalLoading, hideGlobalLoading } = useLoading();

  const handleApiCall = async () => {
    // Show global loading
    showGlobalLoading('Fetching user data...');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Your API call here
      // const response = await apiClient.get('/users');
      
    } catch (error) {
      console.error('API call failed:', error);
    } finally {
      // Hide global loading
      hideGlobalLoading();
    }
  };

  const handleFormSubmit = async (formData) => {
    showGlobalLoading('Saving changes...');
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Your form submission logic here
      // await apiClient.post('/submit', formData);
      
    } catch (error) {
      console.error('Form submission failed:', error);
    } finally {
      hideGlobalLoading();
    }
  };

  const handleRouteTransition = () => {
    showGlobalLoading('Loading page...');
    
    // Navigation logic here
    // navigate('/new-route');
    
    // Note: hideGlobalLoading would be called in the new component's useEffect
  };

  return (
    <div>
      <h2>Global Loading Examples</h2>
      <button onClick={handleApiCall}>
        Trigger API Loading
      </button>
      <button onClick={() => handleFormSubmit({ name: 'test' })}>
        Trigger Form Loading
      </button>
      <button onClick={handleRouteTransition}>
        Trigger Route Loading
      </button>
    </div>
  );
};

export default ExampleComponent;