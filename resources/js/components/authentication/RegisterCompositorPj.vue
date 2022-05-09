<template>
  <authentificationTemplate maxWidth="800px">
    <div class="register-wrapper">
      <div class="auth-box__title">
        <h2>{{ $t("Registrar Compositor(a) - Pessoa Juridica") }}</h2>
      </div>
      <div class="error-message-container">
        <v-alert
          class="ma-2"
          type="error"
          v-if="error && !success"
          text-color="white"
          dense
        >
          {{ error }}
        </v-alert>
        <v-alert
          class="ma-2"
          icon="$vuetify.icons.checkbox-marked-circle-outline"
          v-if="success"
          dense
          type="success"
          text-color="white"
        >
          {{ success }}
        </v-alert>
      </div>

      <v-container>
        <v-row>
          <v-col cols="12" class="auth-box__inputs">
            <div class="divider wide-divider pb-3 mt-1"></div>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="razaosocial"
                  :rules="[rules.required]"
                  :label="$t('Razão Social')"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="nome_fantasia"
                  :rules="[rules.required]"
                  :label="$t('Nome Fantasia')"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="cnpj"
                  :label="$t('CNPJ')"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>

            <h3 class="mb-0 pb-0">{{ $t("Endereço") }}</h3>
            <div class="divider wide-divider pb-3 mt-1"></div>
            <div class="bold text-center"></div>
            <v-row>
              <v-col cols="6" md="3">
                <v-text-field
                  v-model="cep"
                  :rules="[rules.required]"
                  :label="$t('CEP')"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="9" md="6">
                <v-text-field
                  v-model="endereco"
                  :rules="[rules.required]"
                  :label="$t('Endereço')"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="3" md="3">
                <v-text-field
                  v-model="numero"
                  :rules="[rules.required]"
                  :label="$t('Numero')"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="complemento"
                  :label="$t('Complemento')"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="6" md="6">
                <v-text-field
                  v-model="bairro"
                  :label="$t('Bairro')"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="6" md="6">
                <v-text-field
                  v-model="cidade"
                  :label="$t('Cidade')"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="6" md="6">
                <v-text-field
                  v-model="estado"
                  :label="$t('Estado')"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <h3 class="mb-0 pb-0">{{ $t("Responsável Legal") }}</h3>
            <div class="divider wide-divider pb-3 mt-1"></div>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="firstname"
                  :rules="[rules.required]"
                  :label="$t('Primeiro Nome')"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="lastname"
                  :rules="[rules.required]"
                  :label="$t('Ultimo Nome')"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6" md="4">
                <v-text-field
                  v-model="rg"
                  :rules="[rules.required]"
                  :label="$t('RG')"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="cpfcnpj"
                  :rules="[rules.required]"
                  :label="$t('CPF')"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="6" md="4">
                <v-text-field
                  type="date"
                  v-model="nascimento"
                  :rules="[rules.required]"
                  :label="$t('Nascimento')"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6" md="6">
                <!-- <v-text-field v-model="pais" :rules="[rules.required]" :label="$t('País')" outlined></v-text-field> -->
                <v-autocomplete
                  ref="pais"
                  v-model="pais"
                  :rules="[() => !!pais || 'This field is required']"
                  :items="coutries"
                  item-value="nome_pais"
                  item-text="nome_pais"
                  label="Pais"
                  placeholder="Select..."
                  required
                ></v-autocomplete>
              </v-col>
              <v-col cols="6" md="6">
                <v-autocomplete
                  ref="pais"
                  v-model="nacionalidade"
                  :rules="[() => !!nacionalidade || 'This field is required']"
                  :items="coutries"
                  item-value="gentilico"
                  item-text="gentilico"
                  label="Nacionalidade"
                  placeholder="Select..."
                  required
                ></v-autocomplete>
                <!-- <v-text-field v-model="nacionalidade" :rules="[rules.required]" :label="$t('Nacionalidade')" outlined></v-text-field> -->
              </v-col>
            </v-row>
            <div class="divider wide-divider pb-3"></div>

            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="telefone"
                  :rules="[rules.required]"
                  :label="$t('Telefone')"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="celular"
                  :rules="[rules.required]"
                  :label="$t('Celular')"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="link_instagram"
                  :rules="[rules.required]"
                  :label="$t('Perfil no Instagram (link)')"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="link_facebook"
                  :label="$t('Perfil no Facebook (link)')"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="link_site"
                  :label="$t('Site')"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="sociedade_autoral"
                  :label="$t('Sociedade Autoral')"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>

            <v-text-field
              v-model="email"
              :rules="[rules.required]"
              :label="$t('Email')"
              outlined
            ></v-text-field>
            <v-text-field
              :rules="[rules.required, rules.min]"
              :type="showPassword1 ? 'text' : 'password'"
              name="input-10-2"
              :label="$t('Password')"
              v-model="password1"
              :hint="$t('At least 8 characters')"
              class="input-group--focused"
              outlined
              @click:append="showPassword1 = !showPassword1"
            >
              <template v-slot:append>
                <v-icon v-if="showPassword1">
                  $vuetify.icons.eye-outline
                </v-icon>
                <v-icon v-else> $vuetify.icons.eye-outline-off </v-icon>
              </template>
            </v-text-field>

            <v-text-field
              :append-icon="
                showPassword2
                  ? '$vuetify.icons.eye-outline'
                  : '$vuetify.icons.eye-outline-off'
              "
              :rules="[rules.required]"
              :type="showPassword2 ? 'text' : 'password'"
              name="input-10-2"
              v-model="password2"
              @paste.prevent
              :label="$t('Confirm Password')"
              class="input-group--focused"
              outlined
              @click:append="showPassword2 = !showPassword2"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row class="flex-column-reverse flex-md-row">
          <v-col cols="12" md="6">
            <v-btn
              block
              :loading="loading"
              color=""
              :disabled="Boolean(loading || success)"
              @click="$router.push({ name: 'register_compositor' })"
            >
              {{ $t("Voltar") }}
              <template v-slot:loader>
                <span class="custom-loader">
                  <v-icon>$vuetify.icons.cached</v-icon>
                </span>
              </template>
            </v-btn>
          </v-col>
          <v-col cols="12" md="6">
            <v-btn
              block
              :loading="loading"
              color="primary"
              :disabled="Boolean(loading || success)"
              @click="register"
            >
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
              <v-btn
                @click="$router.push({ name: 'login' })"
                :color="success ? 'success' : 'primary'"
                :outlined="!success"
                >{{ $t("Login to your account") }}</v-btn
              >
            </div>
          </div>
        </div>
      </v-container>
    </div>
  </authentificationTemplate>
</template>

<script>
import authentificationTemplate from "../templates/Authentication";
import Coutries from "../../data/coutries";

export default {
  metaInfo: {
    title:
      window.Settings.find((set) => set.key === "appName").value +
      " - Registrar Compositor(a) - Pessoa Juridica",
  },
  components: {
    authentificationTemplate,
    // VFacebookLoginScope
  },
  data() {
    return {
      coutries: Coutries,
      email: "",
      razaosocial: "",
      nome_fantasia: "",
      cnpj: "",
      firstname: "",
      lastname: "",
      name: this.firstname + " " + this.lastname,
      nameArtistico: "",
      rg: "",
      cpfcnpj: "",
      pais: "Brazil",
      nacionalidade: "",
      nome_mae: "",
      nome_pai: "",
      estado_civil: "",
      nome_conjugue: "",
      cep: "",
      endereco: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      estado: "",
      telefone: "",
      celular: "",
      link_instagram: "",
      link_facebook: "",
      link_site: "",
      sociedade_autoral: "",
      password1: "",
      password2: "",
      error: "",
      success: "",
      loading: false,
      showPassword1: false,
      showPassword2: false,
      rules: {
        required: (value) => !!value || this.$t("Required."),
        min: (v) => v.length >= 8 || this.$t("Min 8 characters"),
        emailMatch: () => this.$t("Please enter a valid email."),
      },
    };
  },
  methods: {
    register() {
      this.error = "";
      this.loading = true;
      if (this.password1 !== this.password2) {
        this.error = this.$t("Password does not match!");
        this.loading = false;
      } else {
        axios
          .post("/api/register-artistpj", {
            name: this.firstname + " " + this.lastname,
            email: this.email,
            password: this.password1,
            type_user: "pj",
            razaosocial: this.razaosocial,
            nome_fantasia: this.nome_fantasia,
            cnpj: this.cnpj,
            firstname: this.firstname,
            lastname: this.lastname,
            displayname: this.nameArtistico,
            artistic_name: this.nameArtistico,
            cpfcnpj: this.cpfcnpj,
            rg: this.rg,
            country: this.pais,
            nationality: this.nacionalidade,
            cep: this.cep,
            address: this.endereco,
            address_number: this.numero,
            address_complement: this.complemento,
            address_district: this.bairro,
            address_city: this.cidade,
            address_state: this.estado,
            cell_phone: this.telefone,
            cell_phone: this.phone,
            link_instagram: this.link_instagram,
            link_facebook: this.link_facebook,
            number_whatsapp: this.telefone,
            spotify_link: "#",
            number_telegram: "0",
            link_site: this.link_site,
            sociedade_autoral: this.sociedade_autoral,
          })
          .then((res) => {
            console.log(res);
            this.success =
              res.data.message ||
              this.$t("Account created successfully. You can login now.");
            this.$notify({
              type: "sucess",
              group: "foo",
              message:
                res.data.message ||
                this.$t("Account created successfully. You can login now."),
            });
          })
          .catch((e) => {
            if (e.response.data.errors) {
              this.error = Object.values(e.response.data.errors)[0];
              this.$notify({
                type: "error",
                group: "foo",
                message: Object.values(e.response.data.errors)[0],
              });
            } else {
              this.error = e.response.data;
              this.$notify({
                type: "error",
                group: "foo",
                message: e.response.data,
              });
            }
          })
          .finally(() => (this.loading = false));
      }
    },
    cepCorreios() {
      axios
        .get(`/api/address/${this.cep}`)
        .then((res) => {
          console.log(res);
          this.bairro = res.data.bairro;
          this.cidade = res.data.localidade;
          this.endereco = res.data.logradouro;
          this.estado = res.data.uf;
        })
        .catch((e) => {
          console.log(e);
          this.$notify({
            type: "error",
            group: "foo",
            message: "API de CEP Fora do ar! Digite Manualmente",
          });
        });
    },
  },
  watch: {
    cep(newCep, oldCep) {
      if (newCep.length >= 8 && newCep.length < 9) {
        this.cepCorreios();
      }
    },
  },
};
</script>
