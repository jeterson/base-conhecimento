module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const save = async (req, res) => {
        const category = { ...req.body }
        if (req.params.id)
            category.id = req.params.id

        try {
            existsOrError(category.name, 'Nome não informado')
        } catch (error) {
            return res.status(400).send(error)
        }

        if (category.id) {
            app.db('categories')
                .update(category)
                .where({ id: category.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('categories')
                .insert(category)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Código da Categoria não informado.')
            const subcategoria = await app.db('categories')
                .where({ parentId: req.params.id })
            notExistsOrError(subcategoria, 'Categoria possui Subcategorias')

            const articles = await app.db('articles').where({ categoryId: req.params.id })
            notExistsOrError(articles, 'Categoria possui Artigos')

            const rowsDeleted = await app.db('categories').where({ id: req.params.id }).del()

            existsOrError(rowsDeleted, 'Categoria não foi encontrada')
            res.status(204).send()
        } catch (err) {
            res.status(400).send(err)
        }
    }

    const withPath = categories => {
        const getParent = (categories, parentId) => {
            let parent = categories.filter(c => c.id === parentId)
            return parent.length ? parent[0] : null
        }

        const categoriesWithPath = categories.map(c => {
            let path = c.name
            let parent = getParent(categories, c.parentId)
            while (parent) {
                path = `${parent.name} > ${path}`
                parent = getParent(categories, parent.parentId)
            }
            return { ...c, path }
        })

        categoriesWithPath.sort((a, b) => {
            if (a.path < b.path) return -1
            if (a.path > b.path) return 1
            return 0
        })

        return categoriesWithPath
    }
    const get = (req, res) => {
        app.db('categories')
            .then(categories => res.json(withPath(categories)))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('categories')
            .where({ id: req.params.id })
            .first()
            .then(c => res.json(c))
            .catch(err => res.status(500).send(err))
    }


    const toTree = (categories, tree) => {
        if (!tree) {
            tree = categories.filter(c => !c.parentId)
        }

        tree = tree.map(parentNode => {
            const isChild = node => node.parentId == parentNode.id

            parentNode.children = toTree(categories, categories.filter(isChild))
            return parentNode
        })

        return tree

    }

    const getTree = (req, res) => {
        app.db('categories')
            .then(list => res.json(toTree(withPath(list))))
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, get, getById, getTree }
}