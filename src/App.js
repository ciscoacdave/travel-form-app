import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    finalDestination: '',
    lastName: '',
    dateOfBirth: '',
    contactMethod: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate that all fields are filled
    if (!formData.finalDestination || !formData.lastName || !formData.dateOfBirth || !formData.contactMethod) {
      alert('Please fill in all fields and select a contact method.');
      return;
    }

    // Replace this URL with your actual webhook URL
    const webhookUrl = 'https://webhook.site/3b67a70c-1d49-4400-b565-856ec09a07b7';
    
    setIsSubmitting(true);
    
    try {
      // Send data to webhook
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          finalDestination: formData.finalDestination,
          lastName: formData.lastName,
          dateOfBirth: formData.dateOfBirth,
          contactMethod: formData.contactMethod,
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        alert('Form submitted successfully!');
        // Reset form after successful submission
        setFormData({
          finalDestination: '',
          lastName: '',
          dateOfBirth: '',
          contactMethod: ''
        });
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          {/* Image placeholder */}
          <div className="text-center mb-4">
            <div 
              className="bg-light border rounded d-flex align-items-center justify-content-center"
              style={{ height: '200px', width: '100%' }}
            >
              <span className="text-muted">
                <div style={{ fontSize: '3rem' }}>🖼️</div>
                Replace with your image
              </span>
            </div>
          </div>

          {/* Form */}
          <div className="card p-4 shadow">
            <h2 className="card-title text-center mb-4">Travel Information</h2>
            
            {/* Final Destination */}
            <div className="mb-3">
              <label htmlFor="finalDestination" className="form-label">
                Final Destination
              </label>
              <input
                type="text"
                className="form-control"
                id="finalDestination"
                name="finalDestination"
                value={formData.finalDestination}
                onChange={handleInputChange}
                placeholder="Enter your final destination"
              />
            </div>

            {/* Last Name */}
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter your last name"
              />
            </div>

            {/* Date of Birth */}
            <div className="mb-4">
              <label htmlFor="dateOfBirth" className="form-label">
                Date of Birth
              </label>
              <input
                type="date"
                className="form-control"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
              />
            </div>

            {/* Contact Method Radio Buttons */}
            <div className="mb-4">
              <label className="form-label">How should we contact you?</label>
              <div className="mt-2">
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="contactMethod"
                    id="phone"
                    value="phone"
                    checked={formData.contactMethod === 'phone'}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="phone">
                    Phone
                  </label>
                </div>
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="contactMethod"
                    id="video"
                    value="video"
                    checked={formData.contactMethod === 'video'}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="video">
                    Video
                  </label>
                </div>
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="contactMethod"
                    id="text"
                    value="text"
                    checked={formData.contactMethod === 'text'}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="text">
                    Text
                  </label>
                </div>
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="contactMethod"
                    id="appleBusiness"
                    value="appleBusiness"
                    checked={formData.contactMethod === 'appleBusiness'}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="appleBusiness">
                    Apple Messages for Business
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="d-grid">
              <button 
                type="submit"
                onClick={handleSubmit}
                className="btn btn-primary btn-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;