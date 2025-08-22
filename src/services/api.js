import axios from "axios"

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1"
const USE_MOCK = (import.meta.env.VITE_USE_MOCK ?? "true") === "true"

export const http = axios.create({ baseURL })

// ---- MOCK DB ----
const mockDB = {
  users: [
    { id: 1, email: "admin@easy.stock", name: "Admin", password: "admin123" },
  ],
  products: [
    { id: 1, name: "Palette EUR", sku: "PAL-EUR", stock: 120, supplierId: 1 },
    { id: 2, name: "Carton 60x40", sku: "BOX-6040", stock: 340, supplierId: 2 },
  ],
  suppliers: [
    { id: 1, name: "Fournix SARL", contact: "Jean Dupont" },
    { id: 2, name: "SupplyPro", contact: "Awa Mba" },
  ],
  orders: [
    { id: 1, number: "CMD-0001", status: "En cours", total: 540.5 },
    { id: 2, number: "CMD-0002", status: "Livrée", total: 1200.0 },
  ],
}

const wait = (ms = 300) => new Promise((r) => setTimeout(r, ms))

// ---- AUTH ----
export async function login(email, password) {
  if (!USE_MOCK) {
    // backend attend "mot_de_passe"
    const { data } = await http.post("/auth/login", {
      email,
      mot_de_passe: password,
    })
    // data = { access_token, token_type }
    return data
  }
  await wait()
  const u = mockDB.users.find(
    (x) => x.email === email && x.password === password
  )
  if (!u) throw new Error("Identifiants invalides")
  // on simule la même structure que le backend réel
  return {
    access_token: "mock-token",
    token_type: "bearer",
    user: { id: u.id, email: u.email, name: u.name },
  }
}

// ---- PRODUCTS ----
export async function listProducts() {
  if (!USE_MOCK) return (await http.get("/products")).data
  await wait()
  return [...mockDB.products]
}
export async function createProduct(payload) {
  if (!USE_MOCK) return (await http.post("/products", payload)).data
  await wait()
  const id = Math.max(0, ...mockDB.products.map((p) => p.id)) + 1
  const item = { id, ...payload }
  mockDB.products.push(item)
  return item
}

// ---- SUPPLIERS ----
export async function listSuppliers() {
  if (!USE_MOCK) return (await http.get("/suppliers")).data
  await wait()
  return [...mockDB.suppliers]
}
export async function createSupplier(payload) {
  if (!USE_MOCK) return (await http.post("/suppliers", payload)).data
  await wait()
  const id = Math.max(0, ...mockDB.suppliers.map((s) => s.id)) + 1
  const item = { id, ...payload }
  mockDB.suppliers.push(item)
  return item
}

// ---- ORDERS ----
export async function listOrders() {
  if (!USE_MOCK) return (await http.get("/orders")).data
  await wait()
  return [...mockDB.orders]
}
export async function createOrder(payload) {
  if (!USE_MOCK) return (await http.post("/orders", payload)).data
  await wait()
  const id = Math.max(0, ...mockDB.orders.map((o) => o.id)) + 1
  const item = { id, ...payload }
  mockDB.orders.push(item)
  return item
}
