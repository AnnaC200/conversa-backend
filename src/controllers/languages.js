// const { Language } = require('../models')

// const findAllLanguages = async (req, res) => {
//     try {
//         const languages = await Language.findAll()
//          if(!languages.length) res.status(404).json({ message: "could not find all languages" })
//         return res.status(201).json(languages)
//     } catch(e) {
//         console.error(e)
//         return res.status(500).json({ message: "error finding language"})
//     }
// }

// module.exports = {
//     findAllLanguages
// }