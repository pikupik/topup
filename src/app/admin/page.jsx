import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, Target } from "lucide-react";
import Navbar from "@/components/Navbar";

const Dashboard = () => {
  const packages = [
    { name: "Paket A", amount: 86, price: "Rp 19,000", sold: 456 },
    { name: "Paket B", amount: 86, price: "Rp 19,000", sold: 456 },
    { name: "Paket C", amount: 86, price: "Rp 19,000", sold: 456 },
    { name: "Paket D", amount: 86, price: "Rp 19,000", sold: 456 },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="p-4 max-w-7xl mx-auto space-y-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Dashboard Admin</h1>
            <div className="text-sm text-gray-400">
              {new Date().toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Pendapatan */}
            <Card className="bg-gray-800 text-white">
              <CardContent>
                <div className="flex py-4 items-center gap-2">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                  <div className="text-sm text-gray-400">Total Pendapatan</div>
                </div>
                <div className="text-2xl font-bold">Rp 2,000,000</div>
              </CardContent>
            </Card>
            {/* Produk terjual */}
            <Card className="bg-gray-800 text-white">
              <CardContent>
                <div className="flex py-4 items-center gap-2">
                  <Package className="h-4 w-4 text-gray-400" />
                  <div className="text-sm text-gray-400">Produk Terjual</div>
                </div>
                <div className="text-2xl font-bold">1378829</div>
              </CardContent>
            </Card>
            {/* Produk terlaris */}
            <Card className="bg-gray-800 text-white">
              <CardContent>
                <div className="flex py-4 items-center gap-2">
                  <Target className="h-4 w-4 text-gray-400" />
                  <div className="text-sm text-gray-400">Produk Terlaris</div>
                </div>
                <div className="text-2xl font-bold">Paket A - 12342</div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gray-800 text-white mt-6">
            <CardHeader>
              <CardTitle>Paket Diamond</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left p-4 text-gray-400">
                        Nama Paket
                      </th>
                      <th className="text-left p-4 text-gray-400">
                        Jumlah Diamond
                      </th>
                      <th className="text-left p-4 text-gray-400">Harga</th>
                      <th className="text-left p-4 text-gray-400">Terjual</th>
                    </tr>
                  </thead>
                  <tbody>
                    {packages.map((pkg, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-700 hover:bg-gray-700"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-gray-400" />
                            {pkg.name}
                          </div>
                        </td>
                        <td className="p-4 pl-16">{pkg.amount}</td>
                        <td className="p-4">{pkg.price}</td>
                        <td className="p-4 pl-6">{pkg.sold}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
