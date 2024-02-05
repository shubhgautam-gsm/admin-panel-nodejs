
const mongoose = require('mongoose');
const Product = require('../models/productModel');
const mult = require('../config/multerConfig');
const fs = require('fs');



// Create a new product
exports.createProduct = async (req, res) => {
    try {
        // Check if an image file was uploaded
        if (!req.file) {
            return res.status(400).json({ error: 'Image file is required.' });
        }

        // Get the uploaded image file path
        const imagePath = req.file.path;

        const productData = {
            cat_name: req.body.cat_name,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            imageURL: imagePath, // Save the image path in your database
        };

        const product = new Product(productData);
        await product.save();
        res.redirect('/')
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.productForm = async (req, res) => {
    try {
        return res.render('productForm')
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// Get all products
exports.getAllProducts = async () => {
    try {
        const products = await Product.find();
        return products; // Return the products array
    } catch (error) {
        throw error;
    }
};
// exports.productForm =(req,res)=> {
//     res.render('/productForm')
// };

// Get a single product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // // Use the splitStr function to preprocess the imageURL
        // const processedImageURL =splitStr(product.imageURL);

        // // Include the processed imageURL in the response
        // product.imageURL = processedImageURL;

        res.redirect('/')
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Handle the product update
exports.updateProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const updatedProductData = {
            cat_name: req.body.cat_name,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            // Add other fields as needed
        };

        // Find the product by ID and update it
        const updatedProduct = await Product.findByIdAndUpdate(productId, updatedProductData, {
            new: true, // To return the updated product
        });

        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.redirect('/'); // Redirect to the home page or wherever you want
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a product by ID
// Delete a product by ID
exports.deleteProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        // Find the product by ID
        const product = await Product.findById(productId);

        // Check if the product exists
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.redirect('/')
        // Delete the product from the database
        await product.remove();

        // If you want to delete the associated image file, you can use fs.unlinkSync
        // Replace 'publicPath' with the actual path to your public directory
        const publicPath = 'public'; // Update this with your actual path
        const imagePath = product.imageURL;
        const imagePathToDelete = path.join(publicPath, imagePath);
        // Import the 'fs' module at the top of your file
        const fs = require('fs');

        // Check if the image file exists and then delete it
        if (fs.existsSync(imagePathToDelete)) {
            fs.unlinkSync(imagePathToDelete);
        }
        // Redirect to the home page or display a success message
        res.redirect('/');
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

