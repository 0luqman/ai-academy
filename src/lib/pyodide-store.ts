type PyodideInstance = any;

let pyodidePromise: Promise<PyodideInstance> | null = null;

export async function getPyodide(): Promise<PyodideInstance> {
    if (pyodidePromise) return pyodidePromise;

    pyodidePromise = (async () => {
        if (typeof window === 'undefined') return null;

        // Ensure script is loaded
        if (!(window as any).loadPyodide) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js';
            document.head.appendChild(script);

            await new Promise((resolve) => {
                script.onload = resolve;
            });
        }

        const pyodide = await (window as any).loadPyodide({
            indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/'
        });

        // Pre-initialize IO redirection
        await pyodide.runPythonAsync(`
import sys
import io
def setup_io():
    sys.stdout = io.StringIO()
    sys.stderr = io.StringIO()
setup_io()
        `);

        return pyodide;
    })();

    return pyodidePromise;
}
