import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    padding: 20,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    width: 80,
    marginRight: 10,
    fontWeight: "bold",
  },
  value: {
    flex: 1,
  },
});

const EmployeePDF = ({ employees }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.header}>Employee List</Text>
        {employees.map((employee) => (
          <>
            <View key={employee._id} style={styles.section}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.value}>
                {employee.employee_fname} {employee.employee_lname}
              </Text>
            </View>
            <View key={employee._id} style={styles.section}>
              <Text style={styles.label}>Cni:</Text>
              <Text style={styles.value}>{employee.cni}</Text>
            </View>
            <View key={employee._id} style={styles.section}>
              <Text style={styles.label}>Phone:</Text>
              <Text style={styles.value}>{employee.phone}</Text>
            </View>
            <View key={employee._id} style={styles.section}>
              <Text style={styles.label}>E-mail:</Text>
              <Text style={styles.value}>{employee.email}</Text>
            </View>
            <View key={employee._id} style={styles.section}>
              <Text style={styles.label}>Role:</Text>
              <Text style={styles.value}>{employee.role}</Text>
            </View>
          </>
        ))}
      </Page>
    </Document>
  );
};

export default EmployeePDF;
