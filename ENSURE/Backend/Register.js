const express = require("express")
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const dotenv = require('dotenv');


dotenv.config();

const PORT = 5175;

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "store",
});

db.connect((err) => {
  if (err) {
    console.log("MySQL Serve refused to connect.");
  } else {
    console.log("MySQL Server connected successfully.");
  }
});

const users = `CREATE TABLE IF NOT EXISTS users(
    userId INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM("client", "admin")
    )`;
db.query(users, (err) => {
  if (err) {
    console.log("Error while creating USERS Table. ", err);
  } else {
    console.log("USERS connected.");
  }
});
const storekeeper = `CREATE TABLE IF NOT EXISTS storekeeper(
    stkpId INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

db.query(storekeeper, (err) => {
  if (err) {
    console.log("Error while creating STOREKEEPER Table. ", err);
  } else {
    console.log("STOREKEEPER connected.");
  }
});

const products = `CREATE TABLE IF NOT EXISTS products(
        productId INT PRIMARY KEY AUTO_INCREMENT,
        productName VARCHAR(255) NOT NULL,
        productCode VARCHAR(255) NOT NULL
        )`;

db.query(products, (err) => {
  if (err) {
    console.log("Error while creating PRODUCTS Table. ", err);
  } else {
    console.log("PRODUCTS connected.");
  }
});
const productIn = `CREATE TABLE IF NOT EXISTS stockin(
    stockInId INT PRIMARY KEY AUTO_INCREMENT,
    productId INT NOT NULL,
    stockInDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    stockInQuantity DECIMAL(10, 2) NOT NULL,
        stockInUnitPrice DECIMAL(10, 2) NOT NULL,
        stockInTotal DECIMAL(10, 2) NOT NULL,
        FOREIGN KEY (productId) REFERENCES products(productId) ON DELETE CASCADE
        )`;

db.query(productIn, (err) => {
  if (err) {
    console.log("Error while creating STOCK-IN Table. ", err);
  } else {
    console.log("STOCK-IN connected.");
  }
});
const productOut = `CREATE TABLE IF NOT EXISTS stockout(
    stockOut INT PRIMARY KEY AUTO_INCREMENT,
    productId INT NOT NULL,
    stockOutDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    stockOutQuantity DECIMAL(10, 2) NOT NULL,
    stockOutUnitPrice DECIMAL(10, 2) NOT NULL,
    stockIOutTotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (productId) REFERENCES products(productId) ON DELETE CASCADE
    )`;

db.query(productOut, (err) => {
  if (err) {
    console.log("Error while creating STOCK-OUT Table. ", err);
  } else {
    console.log("STOCK-OUT connected.");
    console.log("Waiting for clients requests...");
  }
});

const activities = `CREATE TABLE IF NOT EXISTS activities(
activityId INT PRIMARY KEY AUTO_INCREMENT,
userId INT NOT NULL,
action VARCHAR(255) NOT NULL,
timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE
)`;

db.query(activities, (err) => {
  if (err) {
    console.log("Error while creating ACTIVITIES Table. ", err);
  } else {
    console.log("ACTIVITIES Table connected.");
  }
});

//JWT Secret key
const SECRET_KEY = process.env.SECRET_KEY;

//Function to generate token for system users
function generateToken(user) {
  return jwt.sign(
    {
      userId: user.userId,
      email: user.email,
      role: user.role,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}

//Creating account
app.post("/api/users/register", async (req, res) => {
  const { username, email, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const findUser = "SELECT * FROM users WHERE email=?";
    const [foundUser] = await db.promise().query(findUser, [email], (err) => {
      if (err) {
        console.log(
          "Error while referencing request credentilas with database."
        );
      }
    });

    if (foundUser.length > 0) {
      console.log("User account already exists. Please Login.");
      res
        .status(400)
        .json({ message: "User account already exists. Please Login." });
    }

    const addUser =
      "INSERT INTO users (username, email, password, role) VALUES(?, ?, ?, ?)";
    await db
      .promise()
      .query(addUser, [username, email, hashedPassword, role], (err) => {
        if (err) {
          console.log("Registeration process got unexpected error. \n");
          res
            .status(500)
            .json({ message: "Internal server while adding user" });
        }
      });
    if (role === "admin") {
      await db
        .promise()
        .query(
          "INSERT INTO storekeeper (username, email, password) VALUES(?, ?, ?)",
          [username, email, hashedPassword],
          (err) => {
            if (err) {
              console.log("Error while adding user as storekeeper");
            }
            console.log("User also created as Storekeeper.");
          }
        );
    }
    console.log("User added in database");
    res.status(200).json({ message: "Register executed well." });
  } catch (error) {
    res.status(500).json({
      message:
        "Internal server error while trying to process registration request.",
    });
    console.log(
      "Internal server error while trying to process registration request.",
      error
    );
  }
});

app.post("/api/users/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("Received: ", username)

  try {
    const findUser = "SELECT * FROM users WHERE username=?";
    const [foundUser] = await db.promise().query(findUser, [username]);

    if (foundUser.length === 0) {
      return res.status(400).json({ message: "User not found." });
    }

    const user = foundUser[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password." });
    }

    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 3600000, // 1 hour
    });

    return res.status(200).json({
      success: true,
      user: {
        userId: user.userId,
        username: user.username,
        email: user.email,
        role: user.role
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

//Verification of token
app.get("/api/verify/token", async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ valid: false });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.json({ valid: false });
    res.json({ valid: true, user: decoded });
  });
});

//Authenticate user
const authenticateUser = (req, res, next) => {
  const token = req.cookies.token;
  if(!token){
    return res.status(401).json({message: "Unauthorized"})
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if(err){
      console.log("Error while verifying user token. ",err)
      res.status(403).json({message: "No token provided"})
    }
    req.user = decoded
    next()
  })
}

//Loggingn actvities
const logActivity = (userId, action) => {
  const sql = `INSERT INTO activities(userId, action) VALUES(?, ?)`;
  db.promise().query(sql, [userId, action], (err, result) => {
    if (err) {
      console.error(
        "Error while trying to send user actions in actvity logs. ",
        err
      );
    } else {
      console.log("Activity added in logs.")
    }
  });
};

app.post("/api/products/add", authenticateUser, async (req, res) => {
  const { productName, productCode } = req.body;
  const userId = req.user.userId

  try {
    const find = "SELECT * FROM products WHERE productCode=?";
    const [found] = await db.promise().query(find, [productCode], (err) => {
      if (err) {
        console.log("Error while referencing product. ", err);
      }
    });

    if (found.length > 0) {
      console.log(
        "Product already exists. You can either update it or add its stock-in data."
      );
    } else {
      await db
        .promise()
        .query(
          "INSERT INTO products (productName, productCode) VALUES(?, ?)",
          [productName, productCode],
          (err) => {
            if (err) {
              console.log("Error while adding product in products. ", err);
            }
          }
        );
        logActivity(userId, `Added stock for ${productCode}`)
      console.log("Product added in stock");
      res.status(201);
    }
  } catch (error) {
    console.log("Internal server error while trying to add product ", error);
  }
});

app.post("/api/stock/in", authenticateUser, async (req, res) => {
  const { productInCode, stockInQuantity, stockInUnitPrice } = req.body;
  const userId = req.user.userId
  console.log("Product code: ", productInCode);

  try {
    const findId = "SELECT * FROM products WHERE productCode = ?";
    const [product] = await db
      .promise()
      .query(findId, [productInCode], (err) => {
        if (err) {
          console.log("Error while referencing product.", err);
        }
      });
    if (product.length === 0) {
      console.log("Product doesn't exist in stock. ");
    }
    const foundProduct = product[0];
    const foundId = foundProduct.productId;
    console.log("Found ID: ", foundId);

    // Product total
    const total = stockInQuantity * stockInUnitPrice;

    const add =
      "INSERT INTO stockin (productId, stockInQuantity, stockInUnitPrice, stockInTotal) VALUES (?, ?, ?, ?)";
    await db
      .promise()
      .query(
        add,
        [foundId, stockInQuantity, stockInUnitPrice, total],
        (err) => {
          if (err) {
            console.log("Error while adding new product.", err);
          }
        }
      );
      logActivity(userId, `Added stock for ${productInCode}`)
    res.status(201).json({ done: true });

    console.log("Product added in stock");
  } catch (error) {
    res.status(500).json({ done: false });
    console.log(
      "Internal server error while trying to add product inn stock.",
      error
    );
  }
});

app.post("/api/stock/out", async (req, res) => {
  const { productOutCode, stockOutQuantity, stockOutUnitPrice } = req.body;

  try {
    const find = "SELECT * FROM stockin WHERE productId=?";
    const [found] = await db.promise().query(find, [productOutCode], (err) => {
      if (err) {
        console.log("Error while referencing product out.", err);
      }
    });
    if (found.length < 0) {
      console.log(
        "Product not found. You can add it, then add product in stock later."
      );
    }
    const foundId = found[0];
    const productId = foundId.productId;
    const productAmount = found.stockInQuantity;
    if (productAmount < stockOutQuantity) {
      console.log(`You have few products in stock. ${productAmount}`);
    } else {
      const remove =
        "UPDATE stockin SET stockInQuantity = stockInQuantity - ? WHERE productId = ?";
      await db
        .promise()
        .query(remove, [stockOutQuantity, productId], async (err) => {
          if (err) {
            console.log("Error while removing product from stock.", err);
          }
        });

      const stockOutTotal = stockOutQuantity * stockOutUnitPrice;
      const addOut =
        "INSERT INTO stockout(productId, stockOutQuantity, stockOutUnitPrice, stockOutTotal) VALUES (?, ?, ?, ?)";
      await db
        .promise()
        .query(
          addOut,
          [productId, stockOutQuantity, stockOutUnitPrice, stockOutTotal],
          (err) => {
            if (err) {
              console.log(
                "Error while adding removed product in stockout. ",
                err
              );
            }
            console.log("Product added is stock-out.");
          }
        );
      console.log("Specified product amount deducted in stock.");
    }
  } catch (error) {
    console.log(
      "Internal server error while trying to remove product from stock. ",
      error
    );
  }
});

app.get("/api/products/stock-in", async (req, res) => {
  const [products] = await db.promise().query(
    `SELECT
      p.productName,
      p.productCode,
      s.stockInDate,
      s.stockInQuantity,
      s.stockInUnitPrice,
      s.stockInTotal
      FROM stockin s JOIN products p ON s.productId = p.productId`
  );
  res.status(200).json(products);
});

app.get("/api/products/stock-out", async (req, res) => {
  const [products] = await db.promise().query(
    `SELECT
    p.productId,
    p.productCode,
    p.productName,
    s.stockOutQuantity,
    s.stockOutUnitPrice,
    s.stockOutTotal,
    s.stockOutDate
    FROM stockout s JOIN products p ON s.productId = p.productId
    `
  );
  res.status(200).json(products);
});

// Backend API (Node.js/Express)
app.get("/api/stock/report", async (req, res) => {
  try {
    const query = `
      SELECT 
        'IN' AS type,
        p.productName,
        p.productCode,
        si.stockInDate AS date,
        si.stockInQuantity AS quantity,
        si.stockInUnitPrice AS unitPrice,
        si.stockInTotal AS total
      FROM stockin si
      JOIN products p ON si.productId = p.productId
      
      UNION ALL
      
      SELECT 
        'OUT' AS type,
        p.productName,
        p.productCode,
        so.stockOutDate AS date,
        so.stockOutQuantity AS quantity,
        so.stockOutUnitPrice AS unitPrice,
        so.stockOutTotal AS total
      FROM stockout so
      JOIN products p ON so.productId = p.productId
      ORDER BY date DESC
    `;

    const [reportData] = await db.promise().query(query);
    console.log("Available", reportData)
    res.json(reportData);
  } catch (error) {
    console.error("Report error:", error);
    res.status(500).json({ error: "Failed to generate report." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on PORT http://localhost:${PORT}`);
});
