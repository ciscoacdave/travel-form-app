import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    finalDestination: '',
    lastName: '',
    dateOfBirth: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Form submitted successfully!');
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

              {/* Submit Button */}
              <div className="d-grid">
                <button 
                  onClick={handleSubmit}
                  className="btn btn-primary btn-lg"
                >
                  Submit
                </button>
              </div>
            </div>

    </div>
      </div>
    </div>
  );
}

export default App;