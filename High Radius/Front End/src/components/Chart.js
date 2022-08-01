import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Pie } from "react-chartjs-2";
import BarChartIcon from "@mui/icons-material/BarChart";
import PieChartIcon from "@mui/icons-material/PieChart";
import AppBar from "@mui/material/AppBar";

import { Button, Grid } from "@mui/material";

const ShowChart = ({ analyticsData, handleClose, open }) => {
    const dataObj = {};
    console.log("hi")
    const currObj = {};
    analyticsData.forEach((data) => {
        dataObj[data["business_name"]] !== undefined
            ? (dataObj[data["business_name"]]["amount"] +=
                  data["total_open_amount"])
            : (dataObj[data["business_name"]] = { amount: 0, total: 1 });

        dataObj[data["business_name"]] !== undefined
            ? (dataObj[data["business_name"]]["total"] += 1)
            : (dataObj[data["business_name"]] = { amount: 0, total: 1 });

        currObj[data["invoice_currency"]] !== undefined
            ? (currObj[data["invoice_currency"]] += 1)
            : (currObj[data["invoice_currency"]] = 1);
    });

    console.log(dataObj);
    const amount = [];
    const total = [];
    const labels = [];
    Object.keys(dataObj).forEach((key) => {
        amount.push(dataObj[`${key}`]["amount"]);
        total.push(dataObj[`${key}`]["total"]);
        labels.push(key);
    });
    const curr = [];
    const currLabels = [];
    Object.keys(currObj).forEach((key) => {
        curr.push(currObj[`${key}`]);
        currLabels.push(key);
    });
    console.log(amount);
    return (
        <>
        <Dialog open={open} onClose={handleClose}>
        {/* <DialogTitle>Advance Search</DialogTitle> */}
        <DialogContent>
                        <Button
                            variant="text"
                            size="1rem"
                            onClick={handleClose}
                        >
                            Close
                        </Button>
                    <Grid
                        item
                        xs={11}
                        sx={{ display: "flex", flexDirection: "row-reverse" }}
                    >
                        <BarChartIcon fontSize={"large"} sx={{ mb: "1px" }} />
                        <PieChartIcon fontSize={"large"} sx={{ mb: "1px" }} />
                    </Grid>
            <div
                style={{
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    top: "80px",
                }}
            >
                <div style={{ width: "80%" }}>
                    <Bar
                        data={{
                            labels: labels,
                            datasets: [
                                {
                                    label: "Number of Customers",
                                    data: total,
                                    backgroundColor: [
                                        "rgba(255, 99, 132, 0.5)",
                                    ],
                                    borderColor: ["rgba(255, 99, 132, 1)"],
                                    borderWidth: 1,
                                },
                                {
                                    label: "Total Open Amount",
                                    data: amount,
                                    backgroundColor: [
                                        "rgba(54, 162, 235, 0.5)",
                                    ],
                                    borderColor: ["rgba(54, 162, 235, 1)"],
                                    borderWidth: 1,
                                },
                            ],
                        }}
                    />
                </div>

                <div style={{ width: "20%" }}>
                    <Pie
                        data={{
                            labels: currLabels,
                            datasets: [
                                {
                                    label: "Invoice Currency",
                                    data: curr,
                                    backgroundColor: [
                                        "rgba(255, 99, 132, 0.7)",
                                        "rgba(54, 162, 235, 0.7)",
                                    ],
                                    borderColor: [
                                        "rgba(255, 99, 132, 1)",
                                        "rgba(54, 162, 235, 1)",
                                    ],
                                    borderWidth: 1,
                                },
                            ],
                        }}
                    />
                </div>
            </div>
            </DialogContent>
            </Dialog>
        </>
    );
};

export default ShowChart;
