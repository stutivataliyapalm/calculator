from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/calculate', methods=['POST'])
def calculate():
    try:
        data = request.get_json()
        if not data or 'expression' not in data:
            return jsonify({"error": "Missing input data"}), 400

        expression = data["expression"]

        # Validate expression (allow only numbers and operators)
        import re
        if not re.match(r"^[0-9+\-*/.]+$", expression):
            return jsonify({"error": "Invalid expression"}), 400

        # Safe calculation using eval with restricted globals
        result = eval(expression, {"__builtins__": None}, {})

        return jsonify({"result": result}), 200

    except Exception as e:
        return jsonify({"error": "Invalid operation"}), 400

if __name__ == '__main__':
    app.run(debug=True)
