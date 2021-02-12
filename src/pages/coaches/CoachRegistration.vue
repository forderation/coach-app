<template>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <coach-form @save-data="saveData"></coach-form>
    </base-card>
  </section>
</template>
save-data
<script>
import CoachForm from "@/components/coaches/CoachForm";
import BaseCard from "@/components/ui/BaseCard";

export default {
  name: "CoachRegistration",
  components: {BaseCard, CoachForm},
  methods: {
    saveData(data) {
      this.$store.dispatch('coaches/registerCoach', data)
      this.$router.replace('coaches')
    }
  },
}
</script>

<style scoped>

</style>