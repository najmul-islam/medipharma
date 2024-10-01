# MediPharma

**MediPharma** is a full-featured medical eCommerce platform that allows users to browse, purchase, and manage pharmaceutical products online. Designed for ease of use and reliability, it caters to both customers and medical professionals, providing a seamless experience for ordering medications, health products, and medical supplies.

## Features

- **User Authentication**: Sign up, log in, and secure session management.
- **Product Catalog**: Browse and search a wide range of medical and pharmaceutical products.
- **Product Categories**: Products are categorized for easy navigation.
- **Product Details**: Detailed information about each product, including dosage, usage, and side effects.
- **Cart Management**: Add products to your cart and manage your purchases.
- **Order Management**: Place and track orders with ease.
- **Admin Panel**: Manage products, orders, and user accounts.
- **Responsive Design**: Fully responsive, optimized for mobile and desktop users.
- **Payment Integration**: Secure online payment options integrated.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: Next.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Tailwind CSS
- **Payment Gateway**: Stripe, PayPal, or other integration
- **Hosting**: Vercel, Render

## Installation

Follow these steps to set up the MediPharma project locally.

### Prerequisites

Ensure you have the following installed:

- **Node.js** (version 12 or higher)
- **MongoDB** (local instance or MongoDB Atlas for cloud database)
- **Git**

### Cloning the Repository

Clone the MediPharma repository:

```bash
git clone https://github.com/najmul-islam/medipharma.git
cd medipharma
```

### Install Dependencies

Install the required dependencies for both the frontend and backend.

```bash
# Install backend dependencies
npm install

# Navigate to the frontend directory and install dependencies
cd frontend
npm install
```

### Setting Up Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```
PORT=5000
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### Running the Application

To run both the backend and frontend:

```bash
# Start the backend
npm run server

# Start the frontend
cd frontend
npm start
```

The backend will run on `http://localhost:5000` and the frontend on `http://localhost:3000`.

## API Endpoints

### User Authentication

- `POST /api/users/register`: Register a new user.
- `POST /api/users/login`: Log in a user.
- `GET /api/users/profile`: Get user profile (protected).

### Products

- `GET /api/products`: Get a list of all products.
- `GET /api/products/:id`: Get details of a single product.
- `POST /api/products`: Add a new product (admin only).
- `PUT /api/products/:id`: Update product information (admin only).
- `DELETE /api/products/:id`: Delete a product (admin only).

### Orders

- `POST /api/orders`: Create a new order.
- `GET /api/orders`: Get all orders for a user.
- `GET /api/orders/:id`: Get a single order by ID.
- `PUT /api/orders/:id/pay`: Mark an order as paid.

## Features to Implement

- **Prescription Upload**: Allow users to upload prescriptions for validation.
- **Order Notification**: Notify users about order status changes.
- **Advanced Filtering**: Implement advanced search and filter options for products.
- **Multi-language Support**: Add support for multiple languages.

## Contribution

We welcome contributions! If you’d like to improve MediPharma, please follow the steps below:

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b feature/AmazingFeature`.
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`.
4. Push to the branch: `git push origin feature/AmazingFeature`.
5. Open a pull request to review your changes.

## License

MediPharma is open-source and distributed under the MIT License. See `LICENSE` for more information.

## Contact

If you have any questions or feedback, feel free to reach out:

- **Name**: Najmul Islam
- **Email**: [najmulislam519@gmail.com](mailto:najmulislam519@gmail.com)
- **Website**: [najmulislam.vercel.app](https://najmulislam.vercel.app)