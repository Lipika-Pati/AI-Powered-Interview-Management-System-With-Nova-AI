package com.example.ims.controller;

import com.example.ims.model.Offer;
import com.example.ims.repository.OfferRepository;
import com.example.ims.service.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/offers")
@CrossOrigin(origins = "*")
public class OfferController {

    @Autowired
    private OfferRepository offerRepository;

    @Autowired
    private EmailService emailService;

    @GetMapping
    public List<Offer> getAllOffers() {
        return offerRepository.findAll();
    }

    @PostMapping("/add")
    public Offer addOffer(@RequestBody Offer offer) {

        Offer savedOffer = offerRepository.save(offer);

        emailService.sendOfferEmail(
                offer.getEmail(),
                offer.getCandidate(),
                offer.getSalary(),
                offer.getJoiningDate()
        );

        return savedOffer;
    }

    @DeleteMapping("/delete/{id}")
    public void deleteOffer(@PathVariable Long id) {
        offerRepository.deleteById(id);
    }
}