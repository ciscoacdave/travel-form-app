import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    finalDestination: '',
    lastName: '',
    helpCategory: '',
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
    if (!formData.finalDestination || !formData.lastName || !formData.helpCategory || !formData.dateOfBirth || !formData.contactMethod) {
      alert('Agent on Demand says: Please fill in all fields and select a contact method.');
      return;
    }

    // Validate phone number if phone or text is selected
    if ((formData.contactMethod === 'phone' || formData.contactMethod === 'text') && !formData.phoneNumber) {
      alert('Agent on Demand says: Please enter a phone number for phone or text contact.');
      return;
    }

    // Validate phone number format (11 digits starting with 1)
    if ((formData.contactMethod === 'phone' || formData.contactMethod === 'text') && formData.phoneNumber) {
      if (formData.phoneNumber.length !== 11 || !formData.phoneNumber.startsWith('1')) {
        alert('Agent on Demand says: Please enter a valid US phone number in format: 18005551212 (11 digits starting with 1)');
        return;
      }
    }

    // Handle Apple Messages for Business
    if (formData.contactMethod === 'appleBusiness') {
      try {
        // Determine Apple Messages URL based on help category
        const messagesUrlMapping = {
          'changeFlight': 'https://bcrw.apple.com/urn:biz:8a4b1370-1933-4b12-b9a9-a94fc58281ca?service=iMessage&body=aod',
          'changeSeat': 'https://bcrw.apple.com/urn:biz:8a4b1370-1933-4b12-b9a9-a94fc58281ca?service=iMessage&body=aod',
          'Baggage': 'https://bcrw.apple.com/urn:biz:8a4b1370-1933-4b12-b9a9-a94fc58281ca?service=iMessage&body=Baggage',
          'somethingElse': 'https://bcrw.apple.com/urn:biz:8a4b1370-1933-4b12-b9a9-a94fc58281ca?service=iMessage&body=aod'


       
        };

        const messagesUrl = messagesUrlMapping[formData.helpCategory];

        if (!messagesUrl) {
          alert('Agent on Demand says: Invalid help category selected.');
          return;
        }

        // Open Apple Messages app with dynamic URL
        window.open(messagesUrl, '_blank');
        
        alert('Agent on Demand says: Opening Apple Messages for Business...');
        
        // Reset form after opening messages
        setFormData({
          finalDestination: '',
          lastName: '',
          helpCategory: '',
          dateOfBirth: '',
          contactMethod: '',
          phoneNumber: ''
        });
        return;
      } catch (error) {
        console.error('Error opening Apple Messages:', error);
        alert('Agent on Demand says: There was an error opening Apple Messages. Please try again.');
        return;
      }
    }

    // Replace this URL with your actual webhook URL
    //const webhookUrl = '/events/1V5WO20HJQ';
    const webhookUrl = 'https://hooks.us.webexconnect.io/events/1V5WO20HJQ'
    setIsSubmitting(true);
    
    try {
      // Prepare data for webhook
      const webhookData = {
        finalDestination: formData.finalDestination,
        lastName: formData.lastName,
        helpCategory: formData.helpCategory,
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
        alert('Agent on Demand says: Form submitted successfully!');
        // Reset form after successful submission
        setFormData({
          finalDestination: '',
          lastName: '',
          helpCategory: '',
          dateOfBirth: '',
          contactMethod: '',
          phoneNumber: ''
        });
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Agent on Demand says: There was an error submitting the form. Please try again.');
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

            {/* Help Category Dropdown */}
            <div className="mb-3">
              <label htmlFor="helpCategory" className="form-label">
                What do you need help with?
              </label>
              <select
                className="form-select"
                id="helpCategory"
                name="helpCategory"
                value={formData.helpCategory}
                onChange={handleInputChange}
              >
                <option value="">Select an option...</option>
                <option value="changeFlight">Change my flight</option>
                <option value="changeSeat">Change my seat</option>
                <option value="Baggage">Baggage Issues</option>
                <option value="somethingElse">Something Else</option>
              </select>
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
                    disabled
                  />
                  <label className="form-check-label text-muted" htmlFor="video">
                    Video
                    <small className="ms-2 text-danger">(wait time greater than 30 minutes)</small>
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
                    disabled
                  />
                  <label className="form-check-label text-muted" htmlFor="text">
                    Text
                    <small className="ms-2 text-danger">(wait time greater than 40 minutes)</small>
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
                  placeholder="1XXXXXXXXXX"
                  pattern="^1[0-9]{10}$"
                  maxLength="11"
                  inputMode="numeric"
                />
                <div className="form-text">
                  Enter 11 digits starting with 1 (e.g., 18005551212)
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