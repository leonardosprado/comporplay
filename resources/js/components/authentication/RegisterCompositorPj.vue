<template>
<authentificationTemplate>
    <div class="register-wrapper">
        <div class="auth-box__title">
            <h2>{{ $t("Registrar Compositor(a) - Pessoa Juridica") }}</h2>
        </div>
        <div class="error-message-container">
            <v-alert class="ma-2" type="error" v-if="error && !success" text-color="white" dense>
                {{ error }}
            </v-alert>
            <v-alert class="ma-2" icon="$vuetify.icons.checkbox-marked-circle-outline" v-if="success" dense type="success" text-color="white">
                {{ success }}
            </v-alert>
        </div>

        <v-container>
            <v-row class="flex-column-reverse flex-md-row">
                <v-col cols="6">
                    <v-btn block :loading="loading" color="" :disabled="Boolean(loading || success)" @click="$router.push({ name: 'register_compositor' })">
                        {{ $t("Voltar") }}
                        <template v-slot:loader>
                            <span class="custom-loader">
                                <v-icon>$vuetify.icons.cached</v-icon>
                            </span>
                        </template>
                    </v-btn>
                </v-col>
                <v-col cols="6">
                    <v-btn block :loading="loading" color="primary" :disabled="Boolean(loading || success)" @click="$router.push({ name: 'register_compositor' })">
                        {{ $t("Registrar") }}
                        <template v-slot:loader>
                            <span class="custom-loader">
                                <v-icon>$vuetify.icons.cached</v-icon>
                            </span>
                        </template>
                    </v-btn>
                </v-col>
            </v-row>
            <div class="divider wide-divider"></div>
            <div>
                <div>
                    <div class="bold text-center">
                        <h3>{{ $t("Already have an account?") }}</h3>
                    </div>
                    <div class="signup-button-con text-center mt-4">
                        <v-btn @click="$router.push({ name: 'login' })" :color="success ? 'success' : 'primary'" :outlined="!success">{{ $t("Login to your account") }}</v-btn>
                    </div>
                </div>
            </div>
        </v-container>
    </div>
</authentificationTemplate>
</template>

<script>
import authentificationTemplate from "../templates/Authentication";
export default {
    metaInfo: {
        title: window.Settings.find((set) => set.key === "appName").value +
            " - Registrar Compositor(a) - Pessoa Fisíca",
    },
    components: {
        authentificationTemplate,
        // VFacebookLoginScope
    },
}
</script>
