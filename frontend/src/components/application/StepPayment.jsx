// frontend/src/components/application/StepPayment.jsx
// Step 5: Application Fee & Simulated Payment Component
// Author: Faheem Shan (B24CSA20)
// Study Reference: Slides 31-32 (State Management & Event Handling)

import React, { useState } from 'react';

function StepPayment({ data, onUpdate, onNext, onPrev }) {
  // Determine fee amount based on candidate category
  const isConcession = data.category === 'SC' || data.category === 'ST';
  const feeAmount = isConcession ? 400 : 800;

  const [paymentMode, setPaymentMode] = useState(data.paymentMode || 'upi');
  const [isSimulatedPaid, setIsSimulatedPaid] = useState(data.paymentStatus === 'Paid');
  const [transactionId, setTransactionId] = useState(data.transactionId || '');
  const [errorMsg, setErrorMsg] = useState('');

  // Handle simulated payment click
  const handleSimulatePayment = () => {
    const generatedTxn = `TXN2026${Date.now().toString().slice(-6)}`;
    setTransactionId(generatedTxn);
    setIsSimulatedPaid(true);
    setErrorMsg('');

    onUpdate({
      paymentMode,
      paymentAmount: feeAmount,
      paymentStatus: 'Paid',
      transactionId: generatedTxn
    });
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (!isSimulatedPaid) {
      setErrorMsg('Please click "Authorize & Simulate Payment" to complete fee processing.');
      return;
    }

    onNext();
  };

  return (
    <form onSubmit={handleContinue} className="form-card">
      <div className="form-card__header">
        <h2 className="form-card__title">Step 5: Application Fee Payment</h2>
        <p className="form-card__desc">
          Review application charges and select your electronic payment gateway.
        </p>
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

        {/* Fee Breakdown Summary Card */}
        <div
          style={{
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            padding: '1.25rem',
            marginBottom: '1.5rem'
          }}
        >
          <h4 style={{ color: 'var(--color-navy)', marginBottom: '0.75rem' }}>Fee Breakdown</h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: 'var(--fs-sm)' }}>
            <span>KEAM 2026 Entrance Examination Fee</span>
            <span>₹{feeAmount}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: 'var(--fs-sm)' }}>
            <span>Category Concession ({data.category || 'General'})</span>
            <span>{isConcession ? 'Applied (50% Concession)' : 'Standard'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: 'var(--fs-sm)' }}>
            <span>Processing Charges</span>
            <span style={{ color: 'var(--color-success)' }}>FREE (₹0.00)</span>
          </div>
          <hr style={{ margin: '0.75rem 0', borderColor: '#E2E8F0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: 'var(--fs-md)', color: 'var(--color-navy)' }}>
            <span>Total Payable Amount:</span>
            <span>₹{feeAmount}.00</span>
          </div>
        </div>

        {/* Payment Gateway Mode Selector */}
        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
          <label className="form-label" style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Select Payment Method:
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                border: paymentMode === 'upi' ? '2px solid var(--color-navy)' : '1px solid #CBD5E1',
                borderRadius: '6px',
                cursor: 'pointer',
                backgroundColor: paymentMode === 'upi' ? '#EFF6FF' : '#fff'
              }}
            >
              <input
                type="radio"
                name="paymentMode"
                value="upi"
                checked={paymentMode === 'upi'}
                onChange={() => setPaymentMode('upi')}
              />
              <span><strong>UPI / QR Code</strong> (Google Pay, PhonePe, Paytm, BHIM)</span>
            </label>

            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                border: paymentMode === 'netbanking' ? '2px solid var(--color-navy)' : '1px solid #CBD5E1',
                borderRadius: '6px',
                cursor: 'pointer',
                backgroundColor: paymentMode === 'netbanking' ? '#EFF6FF' : '#fff'
              }}
            >
              <input
                type="radio"
                name="paymentMode"
                value="netbanking"
                checked={paymentMode === 'netbanking'}
                onChange={() => setPaymentMode('netbanking')}
              />
              <span><strong>Internet Banking</strong> (SBI, Federal Bank, Canara Bank, HDFC, etc.)</span>
            </label>

            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                border: paymentMode === 'card' ? '2px solid var(--color-navy)' : '1px solid #CBD5E1',
                borderRadius: '6px',
                cursor: 'pointer',
                backgroundColor: paymentMode === 'card' ? '#EFF6FF' : '#fff'
              }}
            >
              <input
                type="radio"
                name="paymentMode"
                value="card"
                checked={paymentMode === 'card'}
                onChange={() => setPaymentMode('card')}
              />
              <span><strong>Debit / Credit Card</strong> (Visa, RuPay, MasterCard)</span>
            </label>
          </div>
        </div>

        {/* Simulated Payment Trigger & Confirmation Status */}
        <div
          style={{
            padding: '1.25rem',
            borderRadius: '8px',
            backgroundColor: isSimulatedPaid ? '#ECFDF5' : '#FFFBEB',
            border: `1px solid ${isSimulatedPaid ? '#A7F3D0' : '#FDE68A'}`,
            textAlign: 'center'
          }}
        >
          {isSimulatedPaid ? (
            <div>
              <div style={{ color: '#065F46', fontSize: 'var(--fs-md)', fontWeight: 'bold', marginBottom: '4px' }}>
                Payment Simulation Successful!
              </div>
              <p style={{ color: '#047857', fontSize: 'var(--fs-sm)' }}>
                Amount: <strong>₹{feeAmount}</strong> | Transaction ID: <strong>{transactionId}</strong>
              </p>
            </div>
          ) : (
            <div>
              <p style={{ fontSize: 'var(--fs-sm)', color: '#92400E', marginBottom: '0.75rem' }}>
                In this educational environment, online transactions are safely simulated without real banking debits.
              </p>
              <button
                type="button"
                onClick={handleSimulatePayment}
                className="btn btn--primary"
                style={{ backgroundColor: 'var(--color-navy)' }}
              >
                Authorize &amp; Simulate Payment (₹{feeAmount})
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="form-nav" style={{ display: 'flex', justifyContent: 'space-between', padding: '1.25rem 2rem' }}>
        <button type="button" onClick={onPrev} className="btn btn--outline">
          Back to Uploads
        </button>
        <button type="submit" className="btn btn--primary">
          Continue to Final Review
        </button>
      </div>
    </form>
  );
}

export default StepPayment;
