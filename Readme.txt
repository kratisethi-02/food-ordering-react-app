Food Ordering app

features used:
1. tanStack query to fetch meal items from backend
2. displaying fetching when items are being fetched 
3. created UI components which are reusable components
4. created contextAPI for maintaining Cart functioalities like adding and removing items from cart 
5. updating total items in cart using reduce function which will count the quantities of items
6. created a portal using createPortal from react-dom , for modal (using dialog which is grate for displaying overlays)
    this createPortal will take two arg one the content and 2nd- where you wanna display this portal like document.getElementById
7. created Cart component to display selected item with their quantity, and sub total price
8. created userProgressContext api to keep a track on whether we want to open modal or not 
9. updated header to display quantity of items beside cart
10. Included cart in app.js and onclick process will be set to cart which will open the modal
11. updated the Modal side effect , to open and close modal 
12. created cartItem component to list the items in cart in a formated way
13. created cart actions for close and checkout the cart modal
14. created item actions to increase and decrease the item quantity
15. conditionally rendering the Checkout button on cart based on items in cart
16. created a checkout component which also displays a Modal and displays a form 
17. created Input UI component 
18. using this Input component checkout form is created
19. used FormData , a feature of js browser to handle the form input values 
20. captured all input values using Object.fromEntries(fd.entries())
21. we can also capture single input values using fd.get('full-name')
22. checkout order created by sending Post request to backend which aloso include order details