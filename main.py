from flask import Flask, render_template
from datetime import datetime

books = {1: "Python book", 2: "Java book", 3: "Flask book"}

app = Flask(__name__)


@app.route("/sum/x=<x>&y=<y>")
def get_sum(x, y):
    try:
        return f"{x}+{y} 總和為:{eval(x)+eval(y)}"
    except Exception as e:
        print(e)
        return "輸入錯誤"


@app.route("/books/<int:id>")
def get_book(id):
    try:
        return books[id]
    except Exception as e:
        print(e)
        return "書籍編號錯誤!"


@app.route("/books")
def get_books():
    books = {
        1: {
            "name": "Python book",
            "price": 299,
            "image_url": "https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/CN1/136/11/CN11361197.jpg&v=58096f9ck&w=348&h=348",
        },
        2: {
            "name": "Java book",
            "price": 399,
            "image_url": "https://im1.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/087/31/0010873110.jpg&v=5f7c475bk&w=348&h=348",
        },
        3: {
            "name": "C# book",
            "price": 499,
            "image_url": "https://im1.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/036/04/0010360466.jpg&v=62d695bak&w=348&h=348",
        },
    }

    for id in books:
        print(
            f'編號:{id} 名稱:{books[id]["name"]}\
               價格:{books[id]["price"]} 圖片:{books[id]["image_url"]}'
        )

    return render_template("books.html", books=books)


@app.route("/hello")
@app.route("/")
def index():
    print(datetime.now())
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    return render_template("index.html", name="Tom", time=now)


app.run(debug=True)
