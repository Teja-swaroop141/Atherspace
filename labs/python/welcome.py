import time
from rich.console import Console
from rich.progress import track
from rich.panel import Panel
from rich.table import Table

console = Console()

def hacker_boot():
    console.clear()
    console.print(Panel.fit("[bold green]🚀 EDUKUBE ENVIRONMENT v2.0[/bold green]", border_style="green"))
    
    # 1. Fake System Check
    console.print("[bold cyan]Initializing System...[/bold cyan]")
    time.sleep(1)
    
    steps = ["Allocating RAM", "Mounting Drives", "Connecting to Satellite", "Securing Connection", "Launching Python Kernel"]
    for step in track(steps, description="[green]Processing..."):
        time.sleep(0.3)  # Fake delay to look cool
        
    console.print("\n[bold green]✔ ACCESS GRANTED[/bold green]\n")

    # 2. Show Installed Tools Table
    table = Table(title="installed_tools.exe")
    table.add_column("Tool", style="cyan", no_wrap=True)
    table.add_column("Status", style="magenta")
    table.add_column("Version", style="green")

    table.add_row("Python", "Active", "3.10")
    table.add_row("Pandas", "Ready", "2.1")
    table.add_row("Streamlit", "Standby", "1.3")
    
    console.print(table)
    console.print("\n[bold yellow]👉 Type 'streamlit run dashboard.py' to launch the GUI![/bold yellow]")

if __name__ == "__main__":
    hacker_boot()
    print("hi...Welcome to your Zerosetup Python Lab!")