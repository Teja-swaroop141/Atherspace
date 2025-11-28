import streamlit as st
import pandas as pd
import plotly.express as px

# 1. Page Config
st.set_page_config(page_title="Student Marks Portal", page_icon="🎓")

# 2. Title & Sidebar
st.title("🎓 Student Performance Dashboard")
st.sidebar.header("Filter Options")

# 3. Load Data
st.write("### Raw Data from 'marks.csv'")
df = pd.read_csv('marks.csv')
st.dataframe(df)

# 4. Interactive Graph
st.write("### 📊 Interactive Analysis")
subject = st.sidebar.selectbox("Choose Subject to Analyze", ["Math", "Science", "English"])

# Use Plotly for interactive hovering
fig = px.bar(df, x='Student', y=subject, color=subject, title=f"{subject} Scores by Student")
st.plotly_chart(fig)

# 5. Success Message
st.success("Analysis Complete! This dashboard is running live inside Docker.")