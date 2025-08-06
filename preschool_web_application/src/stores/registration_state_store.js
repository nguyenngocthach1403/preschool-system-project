import { defineStore } from "pinia";
import registrationService from "../services/registration.service";
import enrollmentService from "../services/enrollment.service";

export const userRegistrationStateStore = defineStore("registrationState", {
  state: () => ({
    registrations: [],
    totalRegistration: 0,
    sessions: [],
    sessionClasses: [],
    sessionSelected: {},
    sessionClassSelected: {},
    search: "",
    timeline: [],
    registrationSelected: [],
    limit: 10,
    offset: 1,
    loading: false,
    msgErr: "",
  }),
  getters: {
    isRegistraionEmpty: (state) => state.registrations.length == 0,
  },
  actions: {
    setSessionSelected(seesions) {
      if (seesions.length == 0 && this.sessions.length == 0) return;

      this.sessions = seesions;

      const sessionOpenning = this.sessions.find((item) => item.openning == 1);

      if (!sessionOpenning) {
        this.sessionSelected = this.sessions[this.sessions.length - 1];
        return;
      }

      this.sessionSelected = sessionOpenning;
    },

    async fetchRegistrations({
      search,
      limit,
      offset,
      sessionId,
      classId,
      startTime,
      endTime,
    }) {
      try {
        this.loading = true;

        if (!sessionId && !this.sessionSelected) {
          throw new Error();
        }

        const response = await registrationService.getRegistrations({
          classId: classId || this.sessionClassSelected?.id || "",
          limit: limit || this.limit || 10,
          offset: offset - 1 || this.offset - 1 || 0,
          search: search || this.search || "",
          enrollmentSessionId: sessionId || this.sessionSelected.id || null,
          startTime: startTime || this.timeline[0] || "",
          endTime: endTime || this.timeline[1] || "",
        });

        const registrationsFetched = response.data.data;
        this.registrations = registrationsFetched;
        console.log(this.registrations);
      } catch (error) {
        console.log(`Error fetch registration: ${error}`);
        this.msgErr =
          error.response?.data?.error ||
          "Something went wrong. Please try again.";
        //handle error
      } finally {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }
    },

    async getEnrollmentSessions() {
      try {
        const response = await enrollmentService.getEnrollmentSessions();
        const sessions = response.data.data || [];
        this.setSessionSelected(sessions);
        // this.sessions = sessions;
        // if (this.sessions.length != 0) {
        //   this.sessionSelected = this.sessions[this.sessions.length - 1];
        // }
      } catch (error) {
        console.log(error);
      }
    },
    async fetchSessionClassesBySessionId(sessionId) {
      if (!sessionId && !this.sessionSelected) return;
      try {
        console.log("a", sessionId || this.sessionSelected.id);

        const response = await enrollmentService.getSessionClasses(sessionId);

        const sessionClasses = response.data.data;

        this.sessionClasses = sessionClasses;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
