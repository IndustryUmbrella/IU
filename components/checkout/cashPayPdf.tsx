import React, { useEffect } from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 20, fontSize: 12 },
  section: { marginBottom: 10 },
  heading: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  text: { fontSize: 14, marginBottom: 5 },
  table: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid black",
    marginTop: 10,
  },
  tableRow: { flexDirection: "row", borderBottom: "1px solid black" },
  tableHeader: { backgroundColor: "#f2f2f2", fontWeight: "bold" },
  tableCell: {
    flex: 1,
    padding: 6,
    borderRight: "1px solid black",
    textAlign: "center",
  },
  totalAmount: { marginTop: 10, fontSize: 14, fontWeight: "bold" },
  regards: {
    fontWeight: "bold",
    position: "absolute",
    bottom: 40,
    left: 40,
  },
});

const CashPayPdf = ({ data }: { data: any }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>Cash Payment Order</Text>
          <Text style={styles.text}>
            Dear {data?.buyer.firstname} {data?.buyer.lastname},
          </Text>
          <Text style={styles.text}>
            Industry Umbrella, along with other companies, supports in-person
            cash payments. We have collected your order details and generated
            this PDF. Please print or save this document and bring it to the
            following address:
          </Text>
          <Text style={{ fontWeight: "bold" }}>
            Kabul,KhairKhana, Qalae Najar Ha, Rawnaq Bahar Lozhestic company.
          </Text>
        </View>

        <View style={styles.table}>
          <Text
            style={{
              backgroundColor: "#090909",
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: "18px",
            }}
          >
            Your Products Info
          </Text>

          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCell}>Company Name</Text>
            <Text style={styles.tableCell}>Product Name</Text>
            <Text style={styles.tableCell}>Quantity</Text>
            <Text style={styles.tableCell}>Price per Unit ($)</Text>
            <Text style={styles.tableCell}>Total Price ($)</Text>
          </View>

          {data?.productData?.map((product: any, idx: number) => {
            return (
              <View key={idx} style={[styles.tableRow, styles.tableHeader]}>
                <Text style={styles.tableCell}>{product?.companyName}</Text>
                <Text style={styles.tableCell}>{product?.name}</Text>
                <Text style={styles.tableCell}>{product?.quantity}</Text>
                <Text style={styles.tableCell}>{product?.price} ($)</Text>
                <Text style={styles.tableCell}>
                  {(product?.quantity * product?.price).toFixed(2)} ($)
                </Text>
              </View>
            );
          })}
        </View>

        <Text style={styles.totalAmount}>
          Total Amount:
          {data?.productData
            ?.reduce(
              (acc: any, curr: any) => acc + curr.price * curr.quantity,
              0
            )
            .toFixed(2)}
          $
        </Text>
        <Text style={styles.totalAmount}>
          TIP1: Payment and save the order will not happen without this PDF.
        </Text>
        <Text style={styles.totalAmount}>
          TIP2: We will submit your order when you complete the payment.
        </Text>

        <Text style={styles.regards}>
          Regards, Industry Umbrella (IU) Team.
        </Text>
      </Page>
    </Document>
  );
};

export default CashPayPdf;
