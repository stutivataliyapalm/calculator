from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS to allow frontend requests

@app.route('/calculate', methods=['POST'])
def calculate_stats():
    try:
        data = request.get_json()

        if not data or "numbers" not in data:
            return jsonify({"error": "Invalid input. Provide a list of numbers."}), 400

        numbers = data["numbers"]

        if not isinstance(numbers, list) or len(numbers) == 0:
            return jsonify({"error": "Numbers should be a non-empty list."}), 400

        sum_values = sum(numbers)
        count = len(numbers)
        average = sum_values / count
        sorted_numbers = sorted(numbers)

        median = sorted_numbers[count // 2] if count % 2 != 0 else (sorted_numbers[count // 2 - 1] + sorted_numbers[count // 2]) / 2

        geometric_mean = None
        if all(n > 0 for n in numbers):
            product = 1
            for n in numbers:
                product *= n
            geometric_mean = product ** (1 / count)

        largest = max(numbers)
        smallest = min(numbers)
        range_value = largest - smallest

        return jsonify({
            "sum": sum_values,
            "count": count,
            "average": average,
            "median": median,
            "geometricMean": geometric_mean,
            "largest": largest,
            "smallest": smallest,
            "range": range_value
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
