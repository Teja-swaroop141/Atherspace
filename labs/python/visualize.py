import pandas as pd
import matplotlib.pyplot as plt

print("📊 Reading data from marks.csv...")

# 1. Read the CSV file
df = pd.read_csv('marks.csv')

# 2. Print the data to the terminal to prove Pandas works
print("\n--- Student Marks Table ---")
print(df)
print("---------------------------\n")

# 3. Create a Bar Chart
print("🎨 Generating graph...")
plt.figure(figsize=(10, 6))
plt.bar(df['Student'], df['Math'], color='skyblue')

plt.title('Math Marks Distribution')
plt.xlabel('Students')
plt.ylabel('Marks')

# 4. Save the graph as an image (since we are in a browser)
output_file = 'math_scores.png'
plt.savefig(output_file)

print(f"✅ Success! Graph saved as '{output_file}'")
print("👉 Click on 'math_scores.png' in the file explorer on the left to see it!")