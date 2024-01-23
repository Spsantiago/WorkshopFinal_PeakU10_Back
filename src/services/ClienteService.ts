
import { RowDataPacket } from "mysql2";
import ClienteDao from "../dao/public/CilenteDao";
import { Request } from "express";


class ClienteService {

    public static async consultarClientePorId(req: Request): Promise<any> {
        try {
            const id = req.params.id;
            const clienteInfo= await ClienteDao.obtenerClienteId(id);

            if (clienteInfo) {
                return { status: 200, data: clienteInfo };
            } else {
                return { status: 404, message: "Cliente no encontrado" };
            }
        } catch (err) {
            console.error(err);
            throw new Error("Error interno del servidor");
        }
    }

    public static async consultarClientePorEmail(req: Request): Promise<any> {
        try {
            const {email} = req.body;
            const clienteInfo= await ClienteDao.obtenerClienteEmail(email);

            if (clienteInfo) {
                return { status: 200, data: clienteInfo };
            } else {
                return { status: 404, message: "Cliente no encontrado" };
            }
        } catch (err) {
            console.error(err);
            throw new Error("Error interno del servidor");
        }
    }

    public static async crearCliente(req: Request): Promise<any> {
        try {
            const { email, telefono, direccion, username, password, nombre, apellidos } = req.body;

            const verificarExistencia = await ClienteDao.obtenerClienteEmail(email);

            if (verificarExistencia) {
                return { status: 409, message: "Ya existe un cliente con ese correo" };
            }

            const respuestaCreacion = await ClienteDao.crearCliente(email, telefono, direccion, username, password, nombre, apellidos);

            if (!respuestaCreacion) {
                return { status: 500, message: "No se ha logrado crear el cliente" };
            }

            return { status: 201, data: respuestaCreacion };
        } catch (err) {
            console.error(err);
            throw new Error("Error interno del servidor");
        }
    }

    public static async verificarInicioSesion(req: Request): Promise<any> {
        try {
            const { username, password } = req.body;
            
        } catch (err) {
            console.error(err);
            throw new Error("Error interno del servidor");
        }
    }
}

export default ClienteService;