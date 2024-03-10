import os

def write_to_file():
    # Path to the directory where you want to create the file
    directory_path = "frontend-thing/src/Pages/"

    # Check if the directory exists
    if not os.path.exists(directory_path):
        # If the directory doesn't exist, create it
        os.makedirs(directory_path)

    # Content you want to write to the file
    j = "Some content you want to write to the file. :)"

    # Open the file for writing
    with open(directory_path + "words_file.txt", "w") as f:
        # Write the content of j to the file
        f.write(j)

# Call the function to execute the code
write_to_file()
