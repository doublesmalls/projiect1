<template>
    <div id="dataTypes">
        <Menu class="menu" :theme="theme3" active-name="1">
            <MenuGroup title="内容管理">
                <MenuItem to="/back/sowing" name="1">
                    <Icon type="md-document" />
                    轮播图
                </MenuItem>
                <MenuItem  to="/back/cart" name="2">
                    <Icon type="md-chatbubbles" />
                    货物
                </MenuItem>
            </MenuGroup>
        </Menu>
    </div>
</template>

<script>
    export default {
        name: "dataTypes",
        data () {
            return {
                theme3: 'dark',
            }
        }
    }
</script>

<style scoped>
    #dataTypes{
        width: 15%;
        height: 100%;
        background-color: #2c3e50;
    }
    .menu{
        height: 100%;
    }
</style>