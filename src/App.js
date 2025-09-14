import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    finalDestination: '',
    lastName: '',
    dateOfBirth: '',
    contactMethod: '',
    phoneNumber: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Handle phone number formatting
    if (name === 'phoneNumber') {
      // Remove all non-digits
      const digitsOnly = value.replace(/\D/g, '');
      
      // Limit to 11 digits and ensure it starts with 1
      let formattedValue = digitsOnly;
      if (formattedValue.length > 11) {
        formattedValue = formattedValue.slice(0, 11);
      }
      
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
      return;
    }
    
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: value
      };
      
      // Clear phone number if contact method is changed to video or Apple Messages
      if (name === 'contactMethod' && value !== 'phone' && value !== 'text') {
        newData.phoneNumber = '';
      }
      
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate that all required fields are filled
    if (!formData.finalDestination || !formData.lastName || !formData.dateOfBirth || !formData.contactMethod) {
      alert('Please fill in all fields and select a contact method.');
      return;
    }

    // Validate phone number if phone or text is selected
    if ((formData.contactMethod === 'phone' || formData.contactMethod === 'text') && !formData.phoneNumber) {
      alert('Please enter a phone number for phone or text contact.');
      return;
    }

    // Validate phone number format (11 digits starting with 1)
    if ((formData.contactMethod === 'phone' || formData.contactMethod === 'text') && formData.phoneNumber) {
      if (formData.phoneNumber.length !== 11 || !formData.phoneNumber.startsWith('1')) {
        alert('Please enter a valid US phone number in format: 18472695644 (11 digits starting with 1)');
        return;
      }
    }

    // Replace this URL with your actual webhook URL
    const webhookUrl = '/events/1V5WO20HJQ';
    
    setIsSubmitting(true);
    
    try {
      // Prepare data for webhook
      const webhookData = {
        finalDestination: formData.finalDestination,
        lastName: formData.lastName,
        dateOfBirth: formData.dateOfBirth,
        contactMethod: formData.contactMethod,
        timestamp: new Date().toISOString()
      };

      // Only include phone number if phone or text is selected
      if (formData.contactMethod === 'phone' || formData.contactMethod === 'text') {
        webhookData.phoneNumber = formData.phoneNumber;
      }

      // Send data to webhook
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData)
      });

      if (response.ok) {
        alert('Form submitted successfully!');
        // Reset form after successful submission
        setFormData({
          finalDestination: '',
          lastName: '',
          dateOfBirth: '',
          contactMethod: '',
          phoneNumber: ''
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
<div className="container mt-12">
      <div className="row justify-content-center">
        {/* Change this line to control form width */}
        <div className="col-12 col-md-8 col-lg-6 col-xl-12">
          
          {/* Image */}
          <div className="text-center mb-8">
            <img 
            src="https://storage.googleapis.com/gcp-wxcctoolkit-nprd-41927.appspot.com/assets/DwOVM0HYZPOjxemCLo1foEsxRmm1/AOD.jpg"
            alt="Header" 
            className="img-fluid rounded"
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}/>
          
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

            {/* Phone Number - Only show if Phone or Text is selected */}
            {(formData.contactMethod === 'phone' || formData.contactMethod === 'text') && (
              <div className="mb-4">
                <label htmlFor="phoneNumber" className="form-label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="18472695644"
                  pattern="^1[0-9]{10}$"
                  maxLength="11"
                  inputMode="numeric"
                />
                <div className="form-text">
                  Enter 11 digits starting with 1 (e.g., 18472695644)
                </div>
              </div>
            )}

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