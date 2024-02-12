# Online Shopping App with MongoDB for storing data
The following requirements are fulfilled with appropriate validations enforced:  
- User to be able to view all products by category.  
- User to be able to see the specific details of a product.  
- User to be able to place an order into his cart.  
- User to be able to view his orders placed.  
- Manager to be able to add new products to catalog  
- Update the inventory with available units for a product.  
- After a user places an order for a product, its unit has to be decreased by the quantity he placed into cart.

API Endpoints:
GET /api/v1/users/:email  
GET /api/v1/users/  
POST /api/v1/users  
GET /api/v1/users/:userId/orders  
POST /api/v1/products  
GET /api/v1/products?category=""&name=""  
GET /api/v1/products/:productId  
POST /api/v1/orders  
PUT /api/v1/products/:productId  
