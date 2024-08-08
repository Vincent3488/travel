<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    http_response_code(200);
    echo json_encode(["message" => "Booking request received."]);
    exit();
} else {
    http_response_code(405);
    echo json_encode(["message" => "Method not allowed."]);
    exit();
}
?>
