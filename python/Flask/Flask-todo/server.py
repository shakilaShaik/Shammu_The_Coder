from flask import Flask

app=Flask(__name__)
print("app is running", __name__)


@app.route("/")
def name():
    """
    Purpose: 
    """
    print("app is running", __name__)
    return "hello! there"
if __name__=='__main__':
    app.run(debug=True)

