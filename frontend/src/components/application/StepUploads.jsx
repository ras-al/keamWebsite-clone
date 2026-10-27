// frontend/src/components/application/StepUploads.jsx
// Step 4: Document Uploads Component (Uncontrolled with useRef)
// Author: Faheem Shan (B24CSA20)
// Study Reference: Slides 89-90 (Uncontrolled File Inputs using useRef)

import React, { useRef, useState } from 'react';

function StepUploads({ onNext, onPrev, onSaveFiles, existingFiles = {} }) {
  // Uncontrolled file input DOM references (Slide 90 pattern)
  const photoRef = useRef(null);
  const signatureRef = useRef(null);
  const certificateRef = useRef(null);
  const sslcRef = useRef(null);

  // Local state for immediate UI feedback (file names & previews)
  const [photoPreview, setPhotoPreview] = useState(null);
  const [fileNames, setFileNames] = useState({
    photo: existingFiles.photo?.name || '',
    signature: existingFiles.signature?.name || '',
    certificate: existingFiles.certificate?.name || '',
    sslc: existingFiles.sslc?.name || ''
  });
  const [errorMsg, setErrorMsg] = useState('');

  // Handle file preview and size validation
  const handleFileChange = (field, ref) => {
    const file = ref.current?.files[0];
    if (!file) return;

    // 2MB size limit validation (Slide 89)
    if (file.size > 2 * 1024 * 1024) {
      setErrorMsg(`File "${file.name}" exceeds 2MB size limit. Please upload a smaller file.`);
      ref.current.value = '';
      return;
    }

    setErrorMsg('');
    setFileNames((prev) => ({ ...prev, [field]: file.name }));

    // Show instant image preview for photo using FileReader
    if (field === 'photo' && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setPhotoPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  // Auto-attach sample documents for seamless testing
  const handleAutoFillDemoFiles = () => {
    const dummyPhoto = new File([new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10])], 'candidate_photo.png', { type: 'image/png' });
    const dummySig = new File([new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10])], 'candidate_signature.png', { type: 'image/png' });
    const dummySslc = new File([new Uint8Array([37, 80, 68, 70, 45, 49, 46, 53])], 'sslc_certificate.pdf', { type: 'application/pdf' });

    setFileNames({
      photo: 'candidate_photo.png',
      signature: 'candidate_signature.png',
      certificate: '',
      sslc: 'sslc_certificate.pdf'
    });
    setErrorMsg('');
    onSaveFiles({ photo: dummyPhoto, signature: dummySig, sslc: dummySslc });
  };

  const handleContinue = (e) => {
    e.preventDefault();

    const photo = photoRef.current?.files[0] || existingFiles.photo;
    const signature = signatureRef.current?.files[0] || existingFiles.signature;
    const certificate = certificateRef.current?.files[0] || existingFiles.certificate;
    const sslc = sslcRef.current?.files[0] || existingFiles.sslc;

    // Validate required uploads
    if (!photo) {
      setErrorMsg('Candidate photograph is required. Please select an image or click "Attach Sample Documents".');
      return;
    }

    if (!signature) {
      setErrorMsg('Candidate signature is required. Please select a signature image or click "Attach Sample Documents".');
      return;
    }

    if (!sslc) {
      setErrorMsg('Class 10 / SSLC certificate (proof of date of birth) is required.');
      return;
    }

    // Save files upward to ApplicationPage state (Lifting State Up - Slide 52)
    onSaveFiles({ photo, signature, certificate, sslc });
    onNext();
  };

  return (
    <form onSubmit={handleContinue} className="form-card">
      <div className="form-card__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h2 className="form-card__title">Step 4: Document Uploads</h2>
          <p className="form-card__desc">
            Upload clear scanned copies of required documents (JPG, PNG, or PDF, max 2MB each).
          </p>
        </div>
        <button
          type="button"
          onClick={handleAutoFillDemoFiles}
          className="btn btn--outline"
          style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}
        >
          Attach Sample Documents (Demo)
        </button>
      </div>

      <div className="form-card__body">
        {errorMsg && (
          <div
            style={{
              backgroundColor: '#FEE2E2',
              color: '#B91C1C',
              padding: '0.75rem 1rem',
              borderRadius: '6px',
              marginBottom: '1.25rem',
              fontSize: 'var(--fs-sm)'
            }}
          >
            {errorMsg}
          </div>
        )}

        {/* 1. Candidate Photograph */}
        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
          <label className="form-label">
            Candidate Photograph <span className="form-label__required">*</span>
            <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-mid-gray)', marginLeft: '6px' }}>
              (Passport size, JPG/PNG, max 2MB)
            </span>
          </label>
          <input
            type="file"
            ref={photoRef}
            accept="image/jpeg,image/png"
            className="form-input"
            onChange={() => handleFileChange('photo', photoRef)}
          />
          {fileNames.photo && (
            <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-success)', marginTop: '4px' }}>
              Selected: {fileNames.photo}
            </p>
          )}
          {photoPreview && (
            <div style={{ marginTop: '8px' }}>
              <img
                src={photoPreview}
                alt="Candidate Preview"
                style={{ width: '80px', height: '100px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>
          )}
        </div>

        {/* 2. Candidate Signature */}
        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
          <label className="form-label">
            Candidate Signature <span className="form-label__required">*</span>
            <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-mid-gray)', marginLeft: '6px' }}>
              (Black/Blue ink on white paper, JPG/PNG, max 2MB)
            </span>
          </label>
          <input
            type="file"
            ref={signatureRef}
            accept="image/jpeg,image/png"
            className="form-input"
            onChange={() => handleFileChange('signature', signatureRef)}
          />
          {fileNames.signature && (
            <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-success)', marginTop: '4px' }}>
              Selected: {fileNames.signature}
            </p>
          )}
        </div>

        {/* 3. Class 10 / SSLC Certificate */}
        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
          <label className="form-label">
            Class 10 / SSLC Certificate (Proof of Date of Birth) <span className="form-label__required">*</span>
            <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-mid-gray)', marginLeft: '6px' }}>
              (PDF or JPG, max 2MB)
            </span>
          </label>
          <input
            type="file"
            ref={sslcRef}
            accept="application/pdf,image/jpeg,image/png"
            className="form-input"
            onChange={() => handleFileChange('sslc', sslcRef)}
          />
          {fileNames.sslc && (
            <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-success)', marginTop: '4px' }}>
              Selected: {fileNames.sslc}
            </p>
          )}
        </div>

        {/* 4. Category / Community Certificate */}
        <div className="form-group">
          <label className="form-label">
            Community / Income Certificate (if claiming reservation)
            <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-mid-gray)', marginLeft: '6px' }}>
              (PDF or JPG, max 2MB)
            </span>
          </label>
          <input
            type="file"
            ref={certificateRef}
            accept="application/pdf,image/jpeg,image/png"
            className="form-input"
            onChange={() => handleFileChange('certificate', certificateRef)}
          />
          {fileNames.certificate && (
            <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-success)', marginTop: '4px' }}>
              Selected: {fileNames.certificate}
            </p>
          )}
        </div>
      </div>

      <div className="form-nav" style={{ display: 'flex', justifyContent: 'space-between', padding: '1.25rem 2rem' }}>
        <button type="button" onClick={onPrev} className="btn btn--outline">
          Back to Communication
        </button>
        <button type="submit" className="btn btn--primary">
          Continue to Payment
        </button>
      </div>
    </form>
  );
}

export default StepUploads;
