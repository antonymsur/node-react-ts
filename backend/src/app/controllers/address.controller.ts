import { NextFunction, Request, Response } from "express";

import {Address} from '../models/address.model';

// Create and Save a new Address
exports.create = async(req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    // Validate request
    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    // Create a Address
    await Address.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        addrNumber: req.body.addrNumber,
        street: req.body.street,
        city: req.body.city,
        country: req.body.country,
        zip: req.body.zip,
    }).then((data: any) => {
        res.send(data);
    })
    .catch((err: Error) => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Address."
        });
    });
    // // Save Address in the database
    // address
    //     .save(address)
    //     .then((data: any) => {
    //         res.send(data);
    //     })
    //     .catch((err: Error) => {
    //         res.status(500).send({
    //             message:
    //                 err.message || "Some error occurred while creating the Address."
    //         });
    //     });
    console.log("done create request");
    return;
};
// Retrieve all Addresses from the database.
exports.findAll = (req: Request, res: Response, next: NextFunction) => {
    const name  = req.query.name?.toString();
    
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
    Address.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving address."
            });
        });
};
// Find a single Address with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Address.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Address with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Address with id=" + id });
        });
};
// Update a Address by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    Address.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Address with id=${id}. Maybe Address was not found!`
                });
            } else res.send({ message: "Address was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Address with id=" + id
            });
        });
};
// Delete a Address with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Address.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Address with id=${id}. Maybe Address was not found!`
                });
            } else {
                res.send({
                    message: "Address was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Address with id=" + id
            });
        });
};
// Delete all Address from the database.
exports.deleteAll = (req, res) => {
    Address.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Address were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Address."
            });
        });
};
// Find all published Address
exports.findAllZipCode = (req, res) => {
    const zip = req.params.zip;
    Address.find({ zip: zip })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Address."
            });
        });
};