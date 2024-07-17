const multer = require('multer');
const upload = multer();
const Numbers = require('../utils/importNumbers')
const Users = require('../utils/importUsers')
const Jurisdictions = require('../utils/importJurisdictions')
const Repartitions = require('../utils/importRepartitions')

const importNumbersFile = async (req, res) => {
    upload.single('file')(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).send('Error en la carga del archivo.');
        } else if (err) {
            return res.status(500).send('Error interno en el servidor.');
        }
        if (!req.file) {
            return res.status(400).send('No se proporcionó ningún archivo.');
        }
        const { file, query } = req;
        const compañia = query.compáñia;

        try {
            await Numbers.numbersImporter(file.buffer, compañia);
            res.status(200).send('Importación exitosa');
        } catch (error) {
            console.error('Error Controller:', error);
            return res.status(500).send(error.message);
        }
    });
}

const importUsersFile = async (req, res) => {
    upload.single('file')(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).send('Error en la carga del archivo.');
        } else if (err) {
            return res.status(500).send('Error interno en el servidor.');
        }
        if (!req.file) {
            return res.status(400).send('No se proporcionó ningún archivo.');
        }

        try {
            await Users.importUsers(req.file.buffer);
            console.log("Importacion exitosa");
            return res.status(200).send('Importación exitosa');
        } catch (error) {
            console.error('Error en la importación:', error);
            return res.status(500).send(error.message);
        }
    });
};



const importJurisdictionsFile = async (req, res) => {
    upload.single('file')(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).send('Error en la carga del archivo.');
            } else if (err) {
                return res.status(500).send('Error interno en el servidor.');
            }
            if (!req.file) {
                return res.status(400).send('No se proporcionó ningún archivo.');
            }
            try {
            await Jurisdictions.importJurisdictions(req.file.buffer);
            res.status(200).send('Importación exitosa');
        } catch (error) {
            console.error('Error Controller:', error);
            return res.status(500).send(error.message);
        }
    });
}

const importRepartitionsFile = async (req, res) => {
    upload.single('file')(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).send('Error en la carga del archivo.');
        } else if (err) {
            return res.status(500).send('Error interno en el servidor.');
        }
        if (!req.file) {
            return res.status(400).send('No se proporcionó ningún archivo.');
        }
        try {
            await Repartitions.importRepartitions(req.file.buffer);
            res.status(200).send('Importación exitosa');
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).send(error.message);
        }
    });
    }

module.exports = {
    importNumbersFile,
    importUsersFile,
    importJurisdictionsFile,
    importRepartitionsFile
};
