<?php
// Simple contact handler for the portfolio site.
// Accepts POST with fields: fullname, mobile, message
// Sends email to hello@paulgulfo.com and returns JSON when requested,
// otherwise redirects back to homepage with a query param.

// Change this recipient as needed
$recipient = 'hello@paulgulfo.com';

// Allow only POST for submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Basic sanitization
    $name = isset($_POST['fullname']) ? trim($_POST['fullname']) : '';
    $mobile = isset($_POST['mobile']) ? trim($_POST['mobile']) : '';
    $message = isset($_POST['message']) ? trim($_POST['message']) : '';

    // Honeypot anti-spam (optional field not shown in normal form)
    $hp = isset($_POST['hp']) ? trim($_POST['hp']) : '';
    if ($hp !== '') {
        // bot detected
        http_response_code(400);
        $resp = ['success' => false, 'message' => 'Bot detected'];
        header('Content-Type: application/json');
        echo json_encode($resp);
        exit;
    }

    if ($name === '' || $mobile === '' || $message === '') {
        http_response_code(400);
        $resp = ['success' => false, 'message' => 'Missing fields'];
        header('Content-Type: application/json');
        echo json_encode($resp);
        exit;
    }

    // Build email
    $subject = "Website contact from: $name";
    $body = "Name: $name\nMobile: $mobile\n\nMessage:\n$message\n";
    $headers = [];
    $headers[] = 'From: noreply@' . ($_SERVER['HTTP_HOST'] ?? 'localhost');
    $headers[] = 'Reply-To: ' . $name . ' <' . ($recipient) . '>';
    $headers[] = 'Content-Type: text/plain; charset=UTF-8';

    // Send mail (this uses PHP mail(); ensure your server is configured)
    $ok = mail($recipient, $subject, $body, implode("\r\n", $headers));

    if ($ok) {
        // If the request expects JSON (AJAX), return JSON
        $accept = $_SERVER['HTTP_ACCEPT'] ?? '';
        if (strpos($accept, 'application/json') !== false || isset($_GET['json'])) {
            header('Content-Type: application/json');
            echo json_encode(['success' => true, 'message' => 'Message sent']);
            exit;
        }

        // Otherwise redirect back to the site with success query
        $return = '/index.html?sent=1';
        header('Location: ' . $return);
        exit;
    } else {
        http_response_code(500);
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'message' => 'Failed to send message - server mail error']);
        exit;
    }

} else {
    // For GET requests show a small info page
    ?>
    <!doctype html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <title>Contact endpoint</title>
      <style>body{font-family:system-ui,Arial;padding:20px;background:#071028;color:#e6eef8}</style>
    </head>
    <body>
      <h1>Contact endpoint</h1>
      <p>This endpoint accepts POST requests from the contact form and sends an email to <strong><?php echo htmlspecialchars($recipient); ?></strong>.</p>
      <p>Use the form on <a href="/index.html">the main page</a>.</p>
    </body>
    </html>
    <?php
}

?>
