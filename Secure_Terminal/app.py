
from flask import Flask, render_template
from flask_socketio import SocketIO, emit, join_room

app = Flask(__name__)
app.config["SECRET_KEY"] = "secure-p2p"
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route("/")
def index():
    return render_template("index.html")

@socketio.on("join_network")
def handle_join(data):
    room = data.get("room_id", "")
    if not room:
        emit("join_result", {"success": False, "error": "No room_id provided"})
        return
    join_room(room)
    emit("join_result", {"success": True})

@socketio.on("send_message")
def relay(data):
    room = data.get("room_id", "")
    # accept any encrypted payload and metadata (text/file)
    if not room:
        return
    # Log ciphertext for debugging (appears in server terminal)
    try:
        # print only if an encrypted field is present
        if 'encrypted' in data:
            print(f"[relay] room={room} encrypted={data.get('encrypted')[:120]}...")
        elif 'encrypted_file' in data:
            print(f"[relay] room={room} encrypted_file={data.get('encrypted_file')[:120]}...")
        else:
            print(f"[relay] room={room} payload_keys={list(data.keys())}")
    except Exception:
        pass
    # Remove room_id before relaying to clients
    out = dict(data)
    out.pop('room_id', None)
    emit("receive_message", out, room=room, include_self=False)

if __name__ == "__main__":
    socketio.run(app, debug=True, port = 5050)
