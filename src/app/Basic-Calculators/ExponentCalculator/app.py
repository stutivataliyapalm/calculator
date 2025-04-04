from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow frontend to access backend

@app.route('/calculate', methods=['POST'])
def calculate_exponent():
    try:
        data = request.get_json()
        print("Received Data:", data)  # Debugging log

        # Check if data is received
        if not data:
            return jsonify({"error": "No JSON data received"}), 400

        # Validate input fields
        if 'base' not in data or 'exponent' not in data:
            return jsonify({"error": "Missing 'base' or 'exponent' in request"}), 400

        base = data["base"]
        exponent = data["exponent"]

        # Ensure values are numbers
        try:
            base = float(base)
            exponent = float(exponent)
        except ValueError:
            return jsonify({"error": "Invalid input, 'base' and 'exponent' must be numbers"}), 400

        result = base ** exponent
        return jsonify({"result": result}), 200

    except Exception as e:
        print("Error:", str(e))  # Debugging log
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
