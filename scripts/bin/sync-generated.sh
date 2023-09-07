
cd scripts && yarn gen:routes

# Go to backend folder and format, this should work from wherever the script is called
cd ../backend && yarn format

cd ../frontend && yarn format