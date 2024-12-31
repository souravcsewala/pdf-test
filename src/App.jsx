import React from "react";
import jsPDF from "jspdf";

const PaymentDetailsView = () => {
  // Static data for testing
  const order = {
    courseId: {
      title: "React Development Bootcamp",
      image: "https://via.placeholder.com/600x200", // Placeholder image
      price: 5000,
      discountprice: 3000,
    },
    paymentStatus: "Completed",
    transactionId: "TXN1234567890",
    orderId: "ORD9876543210",
    amount: 3000,
    currency: "INR",
    createdAt: new Date().toISOString(),
  };

  const downloadPDF = () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
  
    // Draw a border around the page
    const borderMargin = 15; // Optional margin between content and border
    pdf.setLineWidth(0.5); // Set border thickness
    pdf.rect(borderMargin, borderMargin, pdfWidth - 2 * borderMargin, pdfHeight - 2 * borderMargin); // Draw border
  
    // Add "Supply Provision" text at the top of the page
    const text = "Supply Provision";
    pdf.setFontSize(20); // Set font size
    pdf.setTextColor(200, 0, 0); // Red color for the text
    pdf.setFont("helvetica", "bold");
  
    // Position "Supply Provision" at the top-center
    const titleWidth = pdf.getTextWidth(text);
    const titleX = (pdfWidth - titleWidth) / 2; // Center horizontally
    const titleY = 10; // Position it near the top of the page
    pdf.text(text, titleX, titleY);
  
    // Add order details centered on the page
    pdf.setFontSize(18); // Set font size for order details
    pdf.setTextColor(0, 0, 0); // Black color for the text
    pdf.setFont("helvetica", "normal");
  
    // Add course details with some space between each line
    const content = [
      `Course Title: ${order.courseId.title}`,
      `Price: ${order.courseId.price} INR`,
      `Discounted Price: ${order.courseId.discountprice} INR`,
      `Payment Status: ${order.paymentStatus}`,
      `Transaction ID: ${order.transactionId || "N/A"}`,
      `Order ID: ${order.orderId}`,
      `Amount Paid: ${order.amount} ${order.currency}`,
      `Date: ${new Date(order.createdAt).toLocaleString()}`,
    ];
  
    // Calculate total height of the content (line height + spacing)
    const lineHeight = 14; // Space between lines
    const contentHeight = content.length * lineHeight;
  
    // Adjust the starting Y position to vertically center the content
    const startY = titleY + 25; // Adjust this value for space between title and content
    let currentY = startY;
  
    // Add each line of the order details, centered horizontally
    content.forEach((line) => {
      const lineWidth = pdf.getTextWidth(line);
      const lineX = (pdfWidth - lineWidth) / 2; // Center each line horizontally
      pdf.text(line, lineX, currentY);
      currentY += lineHeight; // Adjust line spacing
    });
  
    // Signature Image URL (replace with your actual signature image URL or base64 string)
    const signatureImage = "https://static.vecteezy.com/system/resources/thumbnails/023/264/092/small/fake-hand-drawn-autographs-set-handwritten-signature-scribble-for-business-certificate-or-letter-isolated-illustration-vector.jpg"; // Example signature image URL
  
    // Add signature image at the bottom of the page
    const signatureX = (pdfWidth - 150) / 2; // Center horizontally (adjust width if needed)
    const signatureY = pdfHeight - 160; // Position signature near the bottom of the page
    pdf.addImage(signatureImage, "PNG", signatureX, signatureY, 50, 50); // Adjust size and position as needed
  
    // Add text label below the signature image
    const labelText = "Instructor of Supply Provision";
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold"); // Set font size for the label text
    pdf.setTextColor(0, 0, 0); // Black color for the text
    const labelWidth = pdf.getTextWidth(labelText);
    const labelX = (pdfWidth - labelWidth) - 119; // Center horizontally
    const labelY = signatureY + 45; // Position text below the signature (adjust spacing)
  
    pdf.text(labelText, labelX, labelY);
  
    // Save the PDF with dynamic file name based on orderId
    pdf.save(`PaymentDetails_${order.orderId}.pdf`);
  };
  
  
  

  return (
    <div className="text-center">
      <h1 className="text-2xl font-semibold">Payment Details</h1>
      <div>
        <div className="order-details mt-8 p-6 bg-zinc-100 border border-zinc-400 rounded shadow">
          <h2 className="text-xl font-bold mb-4">{order.courseId.title}</h2>
          <img
            className="w-full h-[200px] mb-6 rounded"
            src={order.courseId.image}
            alt={order.courseId.title}
          />
          <p>
            <strong>Price:</strong> {order.courseId.price} INR
          </p>
          <p>
            <strong>Discounted Price:</strong> {order.courseId.discountprice} INR
          </p>
          <p>
            <strong>Payment Status:</strong> {order.paymentStatus}
          </p>
          <p>
            <strong>Transaction ID:</strong> {order.transactionId || "N/A"}
          </p>
          <p>
            <strong>Order ID:</strong> {order.orderId}
          </p>
          <p>
            <strong>Amount Paid:</strong> {order.amount} {order.currency}
          </p>
          <p>
            <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={downloadPDF}
        >
          Download as PDF
        </button>
      </div>
    </div>
  );
};

export default PaymentDetailsView;
