<template>
    <div class="admin-pages">
        <PageTitle icon="fa fa-cogs" main="Administração do Sistema" sub="Cadastros em Geral"/>

        <div class="admin-pages-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Artigos" active>
                        <ArticleAdmin />
                    </b-tab>
                    <b-tab title="Categorias">
                        <CategoryAdmin />
                    </b-tab>
                    <b-tab title="Usuários">
                        <UserAdmin />
                    </b-tab>
                    
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>

import ArticleAdmin from './ArticleAdmin'
import CategoryAdmin from './CategoryAdmin'
import UserAdmin from './UserAdmin'

import PageTitle from '@/components/templates/PageTitle'
export default {
    name: 'AdminPages',
    components: {
        PageTitle,
        ArticleAdmin,
        UserAdmin,
        CategoryAdmin

    }
}
</script>

<style>

</style>
