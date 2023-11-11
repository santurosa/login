import { Router } from "express";
import Users from "../dao/db/users.js";

const userManager = new Users();
const router = Router();

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userManager.getUser(email, password);
        req.session.user = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age,
            rol: user.rol
        }
        res.send({ status: "success", payload: req.session.user });
    } catch (error) {
        res.status(401).send({ status: "error", error: "Credenciales incorrectas" });
    }
})

router.post("/register", async (req, res) => {
    try {
        let { first_name, last_name, email, age, password, rol } = req.body;
        if (!rol) rol = "user";
        const user = await userManager.createUser(first_name, last_name, email, +age, password, rol);
        res.send({ status: "success", message: "User registered", user });
    } catch (error) {
        error;
    }
})

router.get("/logout", (req, res) => {
    req.session.destroy(error => {
        if (error) return res.send({ status: "Logout ERROR", body: error });
        res.redirect("/login");
    })
})

export default router;