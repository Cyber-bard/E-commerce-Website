<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect and sanitize form input
    $name = htmlspecialchars(trim($_POST["name"]));
    $email = htmlspecialchars(trim($_POST["email"]));
    $message = htmlspecialchars(trim($_POST["message"]));

    // Database credentials
    $host = 'localhost';
    $db   = 'contact_form';  // Replace with your database name
    $user = 'root';             // Default XAMPP MySQL username
    $pass = '';                 // Default XAMPP MySQL password (usually empty)

    // Connect to the database
    $conn = new mysqli($host, $user, $pass, $db);

    // Check the connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Insert form data into the database
    $sql = "INSERT INTO submissions (name, email, message) VALUES ('$name', '$email', '$message')";

    if ($conn->query($sql) === TRUE) {
        echo "<script>alert('Message sent successfully!');</script>";
        echo "<script>window.location.href = 'Homepage.html';</script>";  // Redirect to the home page after successful submission
    } else {
        echo "<script>alert('Error: " . $conn->error . "');</script>";
        echo "<script>window.location.href = 'Homepage.html';</script>";  // Redirect back to the home page
    }

    // Close the connection
    $conn->close();
} else {
    // If accessed without submitting the form, redirect to home page
    header("Location: Homepage.html");
    exit;
}
