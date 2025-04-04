from flask import Flask, request, jsonify
from flask_cors import CORS
import math

app = Flask(__name__)
CORS(app)  # Allow CORS for frontend requests

@app.route('/log', methods=['POST'])
def calculate_log():
    try:
        data = request.get_json()
        number = data.get("number")
        base = data.get("base")

        if number is None or base is None:
            return jsonify({"error": "Missing number or base"}), 400

        number = float(number)
        base = float(base) if base.lower() != "e" else math.e

        if number <= 0 or base <= 0 or base == 1:
            return jsonify({"error": "Invalid input. Number and base must be > 0, base ≠ 1"}), 400

        result = math.log(number, base)
        return jsonify({"result": result})

    except ValueError:
        return jsonify({"error": "Invalid input. Please enter valid numbers."}), 400

if __name__ == '__main__':
    app.run(debug=True)
