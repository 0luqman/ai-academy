export default function SetupPage() {
    return (
        <div className="container max-w-3xl py-12 prose prose-invert">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                Local Python Setup Guide
            </h1>
            <p className="leading-7 [&:not(:first-child)]:mt-4 text-muted-foreground text-lg mb-8">
                AI Academy by RiWoT emphasizes practical, hands-on coding. However, <strong>we do not execute code on our backend servers</strong>.
                Instead, we use a client-side execution environment (Pyodide) for quick playground tasks.
                For larger projects, you should set up your own local Python environment. Here is how:
            </p>

            <div className="space-y-8">
                <section>
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                        1. Install Python
                    </h2>
                    <p className="leading-7 mt-4">
                        Download the latest version of Python (3.12+) from the official <a href="https://www.python.org/downloads/" className="font-medium text-primary underline underline-offset-4" target="_blank" rel="noreferrer">Python website</a>.
                        During installation (especially on Windows), make sure to check the box that says <strong>"Add Python to PATH"</strong>.
                    </p>
                </section>

                <section>
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                        2. Choose an IDE
                    </h2>
                    <p className="leading-7 mt-4">
                        We highly recommend <strong>VS Code (Visual Studio Code)</strong>. Install the official Python and Jupyter extensions within VS Code to get linting, formatting, and notebook support.
                    </p>
                </section>

                <section>
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                        3. Setup Virtual Environments
                    </h2>
                    <p className="leading-7 mt-4">
                        Always use virtual environments to manage your dependencies. Open your terminal and run:
                    </p>
                    <pre className="mb-4 mt-4 overflow-x-auto rounded-lg border bg-black py-4 px-4 text-sm font-mono flex flex-col gap-2">
                        <code>python -m venv venv</code>
                        <code># On Windows:</code>
                        <code>.\venv\Scripts\activate</code>
                        <code># On Mac/Linux:</code>
                        <code>source venv/bin/activate</code>
                    </pre>
                </section>

                <section>
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                        4. Install Core Data Science Libraries
                    </h2>
                    <p className="leading-7 mt-4">
                        Once activated, install the standard toolset:
                    </p>
                    <pre className="mb-4 mt-4 overflow-x-auto rounded-lg border bg-black py-4 px-4 text-sm font-mono">
                        <code>pip install pandas numpy matplotlib scikit-learn jupyter</code>
                    </pre>
                    <p className="leading-7 mt-4">
                        You are now ready to tackle the full curriculum on your local machine!
                    </p>
                </section>
            </div>
        </div>
    );
}
