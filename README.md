# Social Media Website

This is a full-featured social media platform built with TypeScript, Node.js, React, MongoDB, Redux, Zegocloud, Cloudinary, Google OAuth, Socket.IO, Tailwind CSS, Nodemailer and DaisyUI. It provides a comprehensive social networking experience for users, allowing them to interact with each other through posts, stories, messaging, and more. The platform also includes an admin side for managing the site effectively.

## Features

### User Side
- **Post Photos**: Share photos with friends and followers.
- **Add Stories**: Post ephemeral stories that disappear after 24 hours.
- **Messaging**: Send and receive messages in real-time.
- **Video & Audio Calls**: Make video and audio calls using Zegocloud.
- **Like & Comment**: Engage with posts by liking and commenting.
- **Report Content**: Report inappropriate content for review.
- **Search**: Find users and content easily.
- **Real-time Notifications**: Receive real-time updates on interactions.

### Admin Side
- **Dashboard**: Overview of site activity and statistics.
- **User Management**: Manage user accounts, roles, and permissions.
- **Reported Post Management**: Review and take action on reported content.
- **Ads Management**: Manage and display advertisements on the platform.

## Screenshots

### User Side

#### Home Page
![Home Page](https://imgur.com/hGzc6rv.png)
*The main feed displaying posts from followed users.*

#### Post Creation
![Post Creation](https://imgur.com/39YRbp8.png)
*Interface for creating and sharing a new post.*

#### Messaging
![Messaging](https://imgur.com/hNsgR3N.png)
*Real-time chat interface for user messaging.*

#### Video Call
![Video Call](https://imgur.com/sqvTkXU.png)
*User interface for making video calls.*

### Admin Side

#### Dashboard
![Admin Dashboard](https://imgur.com/9G5X52o.png)
*Admin dashboard overview with key site metrics.*

#### User Management
![User Management](https://imgur.com/Mo3j0hm.png)
*Admin interface for managing user accounts.*

#### Reported Posts
![Reported Posts](https://imgur.com/Z9SeBYo.png)
*Admin page for reviewing and managing reported posts.*

#### Ads Management
![Ads Management](https://imgur.com/w2YQVAq.png)
*Admin interface for managing site advertisements.*

## Technologies Used

- **Frontend**: React, TypeScript, Redux, Tailwind CSS, DaisyUI
- **Backend**: Node.js, Express, MongoDB, Socket.IO
- **Real-time Communication**: Zegocloud
- **Media Storage**: Cloudinary
- **Authentication**: Google OAuth
- **Email Service**: Nodemailer

## Getting Started

1. Clone the repository:
    ```sh
    https://github.com/MuhammedNoushad/social-media.git
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Set up the environment variables (e.g., MongoDB connection string, Cloudinary API keys, Zegocloud credentials, Google OAuth client ID and secret):
    ```sh
    # .env file
    MONGODB_URI=your_mongodb_connection_string
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    EMAIL=your_nodemailer_email
    PASS=your_nodemailer_pass
    ZEGO_APP_ID=your_zegocloud_app_id
    ZEGO_SERVER_SECRET=your_zegocloud_server_secret
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    ```
4. Start the development server:
    ```sh
    npm start
    ```
5. Open the application in your browser:
    ```sh
    http://localhost:5173
    ```

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

