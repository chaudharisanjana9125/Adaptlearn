from flask import Flask, render_template, request, jsonify
import os
import json

# ---------- File paths ----------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CONTENT_FILE = os.path.join(BASE_DIR, "sample_content.json")

# ---------- Flask app ----------
app = Flask(__name__)

# ---------- Load content ----------
with open(CONTENT_FILE, 'r', encoding='utf-8') as f:
    CONTENT = json.load(f)

# ---------- Keyword-based answer finder ----------
def find_answer(subject, message):
    message = message.lower().strip()
    topics = CONTENT.get(subject, [])

    for topic in topics:
        for kw in topic.get("keywords", []):
            if kw.lower() in message:  # simple substring match
                return topic["answer"]

    return "Sorry, I don't know the answer to that question."

# ---------- Routes ----------
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/ask', methods=['POST'])
def ask():
    data = request.json or {}
    subject = data.get("subject", "introduction_to_database")
    message = data.get("message", "").strip()

    reply = find_answer(subject, message)
    return jsonify({"reply": reply})

# ---------- Run app ----------
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
